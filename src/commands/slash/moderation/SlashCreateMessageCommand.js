const { MessageEmbed, MessageButton } = require("discord.js");
const SlashCommand = require("../../../structures/SlashCommand");

class CreatemsgSlashCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'createmsg',
      description: 'Cria mensagens do bot',
      type: 'CHAT_INPUT',
      options: [
        {
          type: 'SUB_COMMAND',
          name: 'idioma',
          description: 'Mensagem de escolha do idioma',
        },
        {
          type: 'SUB_COMMAND',
          name: 'ticket',
          description: 'Canais para criar mensagens de ticket',
          options: [{
            type: 'STRING',
            name: 'tipo',
            description: 'Qual idioma da mensagem?',
            required: true,
            choices: [{ name: 'Portugues', value: 'br' }, { name: 'Ingles', value: 'us' }]
          }]
        }],
      category: 'moderation',
      UserPermission: ['ADMINISTRATOR'],
      ClientPermissions: ['SEND_MESSAGES', 'SEND_LINKS'],
    })
  }

  async run(ctx) {
    if (ctx.options.getSubcommand() === 'idioma') {
      const channelId = await this.client.database.findOne({ name: 'config' })

      if (!channelId.messageLang) return ctx.reply('O canal para seleção de idiomas não existe')

      const channelToSend = this.client.channels.cache.get(channelId.messageLang)

      const embed = new MessageEmbed()
        .setColor('#35af1f')
        .setTitle('BattleHost - www.battlehost.com.br')
        .setDescription(`Bem vindo ao discord da BattleHost, maior empresa de hospedagem de jogos do Brasil. Para um melhor atendimento, escolha um idioma entre as duas opções abaixo.\n\n🇧🇷 Português (PT-BR)\n🇺🇸 English (EN-US)\n\nPs: não é possível a alteração do idioma.`)
        .setFooter('Copyright ©️ BattleHost', process.env.LOGO_URL)

      const ptButton = new MessageButton()
        .setCustomId('LANG pt')
        .setEmoji('🇧🇷')
        .setLabel('Português (PT-BR)')
        .setStyle('SUCCESS')

      const usButton = new MessageButton()
        .setCustomId('LANG us')
        .setEmoji('🇺🇸')
        .setLabel('English (EN-US)')
        .setStyle('SUCCESS')

      channelToSend.send({ embeds: [embed], components: [{ type: 1, components: [ptButton, usButton] }] })
      ctx.reply('Mensagem criada com sucesso', true)
      return
    }


    if (ctx.options.getString('tipo') === 'br') {
      const channelId = await this.client.database.findOne({ name: 'config' })

      if (!channelId.messageTicketBR) return ctx.reply('O canal para a mensagem de ticket em PT não existe')

      const channelToSend = this.client.channels.cache.get(channelId.messageTicketBR)

      const embed = new MessageEmbed()
        .setColor('#35af1f')
        .setTitle('BattleHost - Suporte via Discord (PT-BR)')
        .setDescription(`Bem vindo a central de suporte da BattleHost. 

        Para podermos iniciar o seu atendimento, escolha um setor e clique no botão correspondente a área desejada.
        
        Departamentos:
        🔩 - Suporte Técnico (problemas/dúvidas gerais do serviço)
        💰 - Suporte Financeiro (suporte pré-compra/dúvidas financeiras)
        📋 - Validação (aplicação da tag cliente)
        
        Ps: possuímos membros na nossa equipe responsáveis por cada setor, por isso, pedimos que evite abrir ticket sem querer/na área incorreta.`)
        .setFooter('Copyright © BattleHost', process.env.LOGO_URL)

      const techSup = new MessageButton()
        .setCustomId('TICKET pt tech')
        .setEmoji('🔩')
        .setLabel('- Suporte Técnico')
        .setStyle('SUCCESS')

      const finSup = new MessageButton()
        .setCustomId('TICKET pt fin')
        .setEmoji('💰')
        .setLabel('- Suporte Financeiro')
        .setStyle('SUCCESS')

      const valSup = new MessageButton()
        .setCustomId('TICKET pt val')
        .setEmoji('📋')
        .setLabel('- Validação')
        .setStyle('SUCCESS')

      channelToSend.send({ embeds: [embed], components: [{ type: 1, components: [techSup, finSup, valSup] }] })
      ctx.reply('Mensagem criada com sucesso', true)
      return
    }

    const channelId = await this.client.database.findOne({ name: 'config' })

    if (!channelId.messageTicketUS) return ctx.reply('O canal para a mensagem de ticket em PT não existe')

    const channelToSend = this.client.channels.cache.get(channelId.messageTicketUS)

    const embed = new MessageEmbed()
      .setColor('#35af1f')
      .setTitle('BattleHost - Support by Discord (EN-US)')
      .setDescription(`Welcome to BattleHost's support center.

      If you have any questions, choose a sector and click on the button corresponding to the desired area.
      
      Departments:
      🔩 - Technical Support (general service problems/doubts)
      💰 - Financial Support (pre-purchase support/financial inquiries)
      📋 - Validation (client tag application in discord)
      
      Ps: we have members in our team responsible for each sector, so we ask you to avoid opening a ticket accidentally/in the wrong area.`)
      .setFooter('Copyright © BattleHost', process.env.LOGO_URL)

    const techSup = new MessageButton()
      .setCustomId('TICKET us tech')
      .setEmoji('🔩')
      .setLabel('- Technical Support')
      .setStyle('SUCCESS')

    const finSup = new MessageButton()
      .setCustomId('TICKET us fin')
      .setEmoji('💰')
      .setLabel('- Financial Support')
      .setStyle('SUCCESS')

    const valSup = new MessageButton()
      .setCustomId('TICKET us val')
      .setEmoji('📋')
      .setLabel('- Validation')
      .setStyle('SUCCESS')

    channelToSend.send({ embeds: [embed], components: [{ type: 1, components: [techSup, finSup, valSup] }] })
    ctx.reply('Mensagem criada com sucesso', true)
    return
  }
}

module.exports = CreatemsgSlashCommand