class SlashCommandContext {
  constructor(
    client,
    interaction,
  ) {
    this.client = client
    this.interaction = interaction
  }

  get options() {
    return this.interaction.options;
  }

  get channel() {
    return this.interaction.channel;
  }

  get author() {
    return this.interaction.user;
  }

  async defer(
    options,
    ephemeral = false,
  ) {
    if (this.interaction.deferred && options) {
      await this.send(options);
      return;
    }

    await this.interaction.deferReply({ ephemeral }).catch(() => null);
  }

  async reply(
    options,
    ephemeral = false,
  ) {
    if (typeof options === 'string')
      return this.interaction
        .reply({
          content: options,
          ephemeral,
        })
        .catch(() => undefined);

    return this.interaction.reply(options).catch(() => undefined);
  }

  async send(options) {
    await this.interaction.followUp(options).catch(() => undefined);
  }

  async deleteReply() {
    return this.interaction.deleteReply().catch(() => undefined);
  }

  async editReply(options) {
    await this.interaction.editReply(options).catch(() => undefined);
  }
}

module.exports = SlashCommandContext