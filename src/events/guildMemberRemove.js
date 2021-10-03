const TicketUtils = require("../Utils/TicketUtils");

class GuildMemberRemoveEvent {
  constructor(client) {
    this.client = client;
    this.name = "guildMemberRemove"
  }

  async run(member) {
    const config = await this.client.database.findOne({ name: 'config' })
    const category = await member.guild.channels.fetch(config.messageTicketCategory);

    category.children.each(async channel => {
      if (channel?.partial || channel.type !== 'GUILD_TEXT') return;
      if (!channel?.topic) return
      const [user, topic] = channel.topic.split(' | ');

      if (user !== member.id) return;

      await channel.send({ content: 'Este canal será fechado pois o criador do ticket saiu do servidor!' }).catch(() => null)

      TicketUtils.closeTicket(this.client.channels.cache.get(config.messageTicketLog), channel.name, user, topic, this.client.user.id, await channel.messages.fetch({ limit: 100 }))

      channel.delete().catch(() => channel.send("Ocorreu um erro ao deletar este canal! Por favor, faça-o manualmente"))
    })

  }
}

module.exports = GuildMemberRemoveEvent