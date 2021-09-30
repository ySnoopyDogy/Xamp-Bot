const MessageCommandContext = require('../structures/MessageCommandContext')

class MessageCreateEvent {
  constructor(client) {
    this.client = client;
    this.name = "messageCreate"
  }

  async run(message) {
    if (message.channel.type === 'DM') return;
    if (message.author?.bot) return;

    if (!message.content.startsWith(process.env.PREFIX)) return;
    const args = message.content
      .slice((process.env.PREFIX).length)
      .trim()
      .split(/ +/g);
    const command = args.shift()?.toLowerCase();
    const comando =
      this.client.commands.get(command) ||
      this.client.commands.get(this.client.aliases.get(command));
    if (!comando) return;

    const ctx = new MessageCommandContext(this.client, message, args);

    const userPermission = comando.config.UserPermission;
    const clientPermission = comando.config.ClientPermissions;
    if (userPermission !== null) {
      if (!message.member?.permissions.has(userPermission)) {
        const perm = userPermission.map(value => `\`${value}\``).join(', ');
        return ctx.reply(
          `Você precisa das permissões: ${perm} pra executar isso, ${message.author}`
        );
      }
    }
    if (clientPermission !== null) {
      if (
        !message.guild?.me?.permissions.has(clientPermission) ||
        !message.channel.permissionsFor(this.client.user?.id ?? 'a')?.has(clientPermission)
      ) {
        const perm = clientPermission.map(value => `\`${value}\``).join(', ');
        return ctx.reply(`O cliente precisa das permissões: ${perm} pra executar isso`);
      }
    }

    try {
      new Promise(res => res(comando.run(ctx)));
    } catch {
      // Do nothing
    }
  }
}

module.exports = MessageCreateEvent