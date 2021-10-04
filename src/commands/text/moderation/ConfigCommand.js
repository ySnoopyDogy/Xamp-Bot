const Command = require("../../../structures/MessageCommand");
const { MessageEmbed } = require('discord.js')

class MessageConfigCommand extends Command {
  constructor(client) {
    super(client, 'config', {
      category: 'moderation',
      UserPermission: ['ADMINISTRATOR'],
      ClientPermissions: ['SEND_MESSAGES', 'SEND_LINKS'],
    })
  }

  async run(ctx) {

    const allConfigs = await this.client.database.findOne({ name: 'config' })
    const embed = new MessageEmbed()
      .setTitle('Configurações')
      .setDescription(`**Canal de Criação de Ticket PT**: <#${allConfigs.messageTicketBR ?? '`NONE`'}> (${allConfigs.messageTicketBR ?? '`NONE`'})
      **Canal de Criação de Ticket US**: <#${allConfigs.messageTicketUS ?? '`NONE`'}> (${allConfigs.messageTicketUS ?? '`NONE`'})
      **Categoria para Criação dos Tickets**: <#${allConfigs.messageTicketCategory ?? '`NONE`'}> (${allConfigs.messageTicketCategory ?? '`NONE`'})     
      **Canal para os Logs de Tickets**: <#${allConfigs.messageTicketLog ?? '`NONE`'}> (${allConfigs.messageTicketLog ?? '`NONE`'})
      **Canal para os Logs de Convites**: <#${allConfigs.messageInviter ?? '`NONE`'}> (${allConfigs.messageInviter ?? '`NONE`'})
      **Canal para Escolha de Idioma**: <#${allConfigs.messageLang ?? '`NONE`'}> (${allConfigs.messageLang ?? '`NONE`'})
      **Cargo do Idioma PT**: <@&${allConfigs.roleLangBR ?? '`NONE`'}> (${allConfigs.roleLangBR ?? '`NONE`'})
      **Cargo do Idioma US**: <@&${allConfigs.roleLangUS ?? '`NONE`'}> (${allConfigs.roleLangUS ?? '`NONE`'})
      **Cargo de Administradores**: <@&${allConfigs.roleAdministrator ?? '`NONE`'}> (${allConfigs.roleAdministrator ?? '`NONE`'})
      `)
      .setColor('DARK_GREEN')

    ctx.reply({ embeds: [embed] })
  }
}

module.exports = MessageConfigCommand