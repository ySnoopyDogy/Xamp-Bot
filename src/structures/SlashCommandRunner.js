const SlashCommandContext = require('./SlashCommandContext')

module.exports = (client, interaction) => {
  const comando = client.slashCommands.get(interaction.commandName)
  if (!comando) return;

  const ctx = new SlashCommandContext(client, interaction);

  const userPermission = comando.config.UserPermission;
  const clientPermission = comando.config.ClientPermissions;

  if (userPermission !== null) {
    if (!interaction.member?.permissions.has(userPermission)) {
      const perm = userPermission.map(value => `\`${value}\``).join(', ');
      return ctx.reply(
        `Você precisa das permissões: ${perm} pra executar isso, ${message.author}`
      );
    }
  }
  if (clientPermission !== null) {
    if (
      !interaction.guild?.me?.permissions.has(clientPermission) ||
      !interaction.channel.permissionsFor(client.user?.id ?? 'a')?.has(clientPermission)
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