const { MessageEmbed } = require("discord.js");
const Command = require("../../../structures/MessageCommand");

class MessageInviteCommand extends Command {
  constructor(client) {
    super(client, 'invite', {
      category: 'moderation',
      UserPermission: ['ADMINISTRATOR'],
      ClientPermissions: ['SEND_MESSAGES'],
    })
  }

  async run(ctx) {
    const config = await this.client.database.findOne({ name: 'config' })

    const embed = new MessageEmbed()
      .setColor('AQUA')
      .setTitle('Invites Registrados')
      .setDescription(config.invites.reduce((p, c) => p += `**Código:** ${c.code}\n**Usos:** ${c.uses}\n**Nome:** ${c.name}\n\n`, ''))

    ctx.sendEmbed(embed, true)

  }
}

module.exports = MessageInviteCommand