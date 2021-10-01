const Command = require("../../../structures/MessageCommand");

class PingCommand extends Command {
  constructor(client) {
    super(client, 'createlangmessage', {
      aliases: ['clm'],
      category: 'moderation',
      UserPermission: ['ADMINISTRATOR'],
      ClientPermissions: ['SEND_MESSAGES', 'SEND_LINKS'],
    })
  }

  async run(ctx) {

  }
}

module.exports = PingCommand