const Command = require("../../structures/Command");
const { MessageEmbed } = require('discord.js')

class PingCommand extends Command {
  constructor(client) {
    super(client, 'createlangmessage', {
      aliases: ['clm'],
      category: 'moderation',
      ClientPermissions: ['SEND_MESSAGES', 'SEND_LINKS'],
    })
  }

  async run(ctx) {

  }
}

module.exports = PingCommand