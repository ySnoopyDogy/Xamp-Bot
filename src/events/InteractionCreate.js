const SlashCommandRunner = require('../structures/SlashCommandRunner')

class InteractionCreateEvent {
  constructor(client) {
    this.client = client;
    this.name = "interactionCreate"
  }

  async run(interaction) {
    if (!interaction.inGuild() || interaction.channel?.type === 'DM') return;

    switch (interaction.type) {
      case 'APPLICATION_COMMAND':
        SlashCommandRunner(this.client, interaction)
        break;
    }
  }
}

module.exports = InteractionCreateEvent