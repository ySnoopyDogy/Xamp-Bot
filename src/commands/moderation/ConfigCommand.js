const Command = require("../../structures/Command");
const { MessageEmbed } = require('discord.js')

class PingCommand extends Command {
  constructor(client) {
    super(client, 'config', {
      category: 'moderation',
      UserPermission: ['ADMINISTRATOR'],
      ClientPermissions: ['SEND_MESSAGES', 'SEND_LINKS'],
    })
  }

  async run(ctx) {
    if (!ctx.args || ctx.args.length === 0) {
      const noArgsEmbed = new MessageEmbed()
        .setColor('RED')
        .setTitle('⚙️ | Escolha o que você quer configurar')
        .setDescription(`
      coistas 
      da
      config`)

      ctx.sendEmbed(noArgsEmbed, true)
    }
  }
}

module.exports = PingCommand