class MessageCommandContext {
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
    return this.message.channel.send({ embeds: [embed] });
  }

  async sendR(msg) {
    return this.message.channel.send(msg);
  }

  async reply(text) {
    return this.message.channel.send({
      content: text,
      reply: {
        messageReference: this.message,
      },
    });
  }
}

module.exports = MessageCommandContext