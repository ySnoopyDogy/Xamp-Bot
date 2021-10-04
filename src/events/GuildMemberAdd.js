const { MessageEmbed } = require("discord.js");

class GuildMemberAddEvent {
  constructor(client) {
    this.client = client;
    this.name = "guildMemberAdd"
  }

  async run(member) {
    if (member.user.bot) return;

    const config = await this.client.database.findOne({ name: 'config' })

    const guildInvites = await member.guild.invites.fetch();

    const usedInvite = guildInvites.find(a => a.uses > config.invites.find(b => b.code === a.code)?.uses)

    if (!usedInvite) return

    config.invites.find(a => a.code === usedInvite.code).uses = usedInvite.uses

    const logChannel = this.client.channels.cache.get(config.messageInviter);

    const { code, uses, inviter } = usedInvite;

    const embed = new MessageEmbed()
      .setAuthor(`${member.user.tag} Entrou!`, member.user.displayAvatarURL())
      .addField("Informações do Convite", [
        `➤ **Código:** ${code}`,
        `➤ **Criado por:** ${inviter.tag}`,
        `➤ **Usado:** ${uses}`,
      ].join('\n'))
      .setColor("BLUE");

    logChannel.send({ embeds: [embed] }).catch(() => null);
    config.markModified('invites')
    await config.save()
  }
}

module.exports = GuildMemberAddEvent