class CommandContext {
  constructor(client, message, args) {
    this.client = client;
    this.message = message;
    this.args = args;
  }

  async sendEmbed(embed, reply = false) {
    if (reply)
      return this.message.channel.send({
        embeds: [embed],
        reply: { messageReference: this.message },
      });
    return this.message.channel.send({ embeds: [embed] }).catch(() => null);
  }

  async send(msg) {
    return this.message.channel.send(msg).catch(() => null);
  }

  async reply(options) {
    return this.message.channel.send({
      ...options,
      reply: {
        messageReference: this.message,
      },
    }).catch(() => null);
  }
}

module.exports = CommandContext