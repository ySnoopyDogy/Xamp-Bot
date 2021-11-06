const { MessageEmbed, MessageButton, MessageAttachment } = require("discord.js")
const moment = require('moment-timezone')


const prettyType = {
  tech: 'tecnico',
  val: 'validacao',
  fin: 'financeiro'
}

const categoriesByLang =
{
  pt: {
    tech: 'Suporte Técnico',
    fin: 'Suporte Financeiro',
    val: 'Validação'
  },
  us: {
    tech: 'Technical Support',
    fin: 'Financial Support',
    val: 'Validation'
  },
  es: {
    tech: 'Soporte técnico',
    fin: 'Apoyo financiero',
    val: 'Validación'
  }
}

class TicketUtils {
  static closeTicket(toSendChannel, ticketName, user, topic, closedBy, messages) {
    const embed = new MessageEmbed()
      .setTitle('Ticket Fechado')
      .setColor('RED')
      .setDescription(`**Sala:** #${ticketName}\n**Usuário:** <@${user}> (${user})\n**Tópico:** ${topic}\n**Fechado por:** <@${closedBy}> (${closedBy})`)


    const lines = []

    messages.each(message => {
      if (message?.partial) return;
      lines.push(`${moment(message.createdTimestamp).tz("America/Sao_Paulo").format('DD/MM/YYYY [às] hh:mm:ss')} (${message.author.id}) ${message.author.tag}: ${message.content.length > 0 ? message.content : `[ANEXO]: ${message.attachments.size > 0 ? message.attachments.map(a => a.url).join(", ") : "Sem link de anexos"}`}`)
    })

    lines.reverse()

    const attc = new MessageAttachment(Buffer.from(lines.join('\n')), `${Date.now()}.log`)

    toSendChannel.send({ embeds: [embed], files: [attc] })
  }

  static async createTicket(guild, adminRole, user, lang, type, ticketNumber, categoryId, everyone) {

    const toRepeat = (3 - ticketNumber.toString().length) < 0 ? 0 : (3 - ticketNumber.toString().length)

    const channelName = `${prettyType[type]}-${"0".repeat(toRepeat)}${ticketNumber}`

    const createdChannel = await guild.channels.create(channelName, {
      type: 'GUILD_TEXT',
      topic: `${user.id} | ${categoriesByLang.pt[type]} [${lang.toUpperCase()}]`,
      parent: categoryId,
      permissionOverwrites: [
        {
          id: everyone,
          deny: ['VIEW_CHANNEL'],
          type: 'role'
        },
        {
          id: adminRole,
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY'],
          type: 'role'
        },
        {
          id: user.id,
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY'],
          type: 'member'
        }
      ]
    }).catch(() => null)

    if (!createdChannel) return null

    const embed = new MessageEmbed()
    if (lang === 'pt') {
      embed.setTitle('BattleHost - Suporte (PT-BR)')
        .setDescription(`Olá ${user.toString()} bem-vindo ao sistema de suporte da BattleHost.
        Você será atendido em breve, enquanto isso, descreva mais o seu problema/dúvida.`)
        .setColor('#35af1f')
        .addField('Tópico do Ticket', categoriesByLang[lang][type])
    }
    if (lang === 'us') {
      embed.setTitle('BattleHost - Support (EN-US)')
        .setDescription(`Hi ${user.toString()}, welcome to BattleHost's support system.
        You will be attended to soon, in the meantime, please describe your problem/doubt more.`)
        .setColor('#35af1f')
        .addField('Ticket Topic', categoriesByLang[lang][type])
    }

    if (lang === 'es') {
      embed.setTitle('BattleHost - Soporte (ES-ES)')
        .setDescription(`Hola, ${user.toString()}, bienvenido al sistema de soporte de BattleHost.
        Será atendido pronto, mientras tanto, describa su problema/duda más.`)
        .setColor('#35af1f')
        .addField('Tema del ticket', categoriesByLang[lang][type])
    }
    const closeButton = new MessageButton()
      .setCustomId('TICKET pt close')
      .setStyle('DANGER')
      .setLabel('Fechar Ticket')
      .setEmoji('🔒')

    const msg = await createdChannel.send({ content: adminRole.toString(), embeds: [embed], components: [{ type: 1, components: [closeButton] }] })
    msg.pin().catch(() => null)

    return createdChannel.id

  }
}

module.exports = TicketUtils