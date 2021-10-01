const Command = require("../../../structures/MessageCommand");
const { MessageEmbed } = require('discord.js')

class MessageDeployCommand extends Command {
  constructor(client) {
    super(client, 'deploy', {
      category: 'moderation',
      UserPermission: ['ADMINISTRATOR'],
      ClientPermissions: ['SEND_MESSAGES'],
    })
  }

  async run(ctx) {
    const commands = this.client.slashCommands.reduce((p, c) => {
      p.push({
        name: c.config.name,
        description: c.config.name,
        type: c.config.name,
        options: c.config.options,
      })
      return p;
    }, [])

    await ctx.message.guild.commands.set(commands)
    ctx.reply('Comandos deployados')
  }
}

module.exports = MessageDeployCommand