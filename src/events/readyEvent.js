class ReadyEvent {
  constructor(client) {
    this.client = client;
    this.name = "ready"
  }

  async run() {

    const config = await this.client.database.findOne({ name: 'config' })

    for (const guild of this.client.guilds.cache.values()) {
      await guild.invites.fetch().then(inv => inv.each(a => {
        const inConf = config.invites.findIndex(b => a.code === b.code)
        if (inConf === -1) return

        if (!a.uses) return
        config.invites[inConf].uses = a.uses
      }))
    }
    config.markModified('invites')
    await config.save()
  }
}

module.exports = ReadyEvent