const Command = require("../../../structures/MessageCommand");
const { MessageEmbed } = require('discord.js')

class PingCommand extends Command {
  constructor(client) {
    super(client, 'ping', {
      category: 'utils',
      ClientPermissions: ['SEND_MESSAGES'],
    })
  }

  async run(ctx) {
    const embed = new MessageEmbed()
      .setTitle('BotInfo')
      .setColor('#f47fff')
      .addFields([
        {
          name: 'Ping',
          value: `**Host:** \`${Math.round(this.client.ws.ping)}\`ms\n**API:** \`${Date.now() - ctx.message.createdTimestamp
            }\`ms`,
          inline: false,
        },
        {
          name: 'Memória RAM',
          value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`,
          inline: false,
        },
      ]);

    ctx.sendEmbed(embed);
  }
}

module.exports = PingCommand