const SlashCommandRunner = require('../structures/SlashCommandRunner');
const TicketUtils = require('../Utils/TicketUtils');

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
      case 'MESSAGE_COMPONENT':
        this.runComponent(interaction)
        break;
    }
  }

  async runComponent(interaction) {
    const [type, lang, method] = interaction.customId.split(' ')

    const config = await this.client.database.findOne({ name: 'config' })

    switch (type) {
      case 'LANG': {
        const toAddRole = (lang === 'pt' ? config.roleLangBR : (lang === 'es' ? config.roleLangES : config.roleLangUS))
        if (interaction.member.roles.cache.hasAny(config.roleLangBR, config.roleLangUS)) return interaction.deferUpdate()
        const res = await interaction.member.roles.add(toAddRole).catch(() => null)
        if (!res) return interaction.reply({ content: '> Error!', ephemeral: true })
        interaction.reply({ content: '> OK', ephemeral: true })
        break;
      }
      case 'TICKET': {
        if (method === 'close') {
          if (!interaction.member.roles.cache.has(config.roleAdministrator)) return interaction.reply({ content: '> Only admins can do this!', ephemeral: true })
          const topic = interaction.channel.topic.split(" | ")
          TicketUtils.closeTicket(this.client.channels.cache.get(config.messageTicketLog), interaction.channel.name, topic[0], topic[1], interaction.user.id, await interaction.channel.messages.fetch({ limit: 100 }))
          await interaction.reply("> Ticket fechado!")
          interaction.channel.delete().catch(() => interaction.channel.send("Ocorreu um erro ao deletar este canal! Por favor, faça-o manualmente"))
        }

        switch (method) {
          case 'tech': {
            const errorMessage = (lang === 'pt' ? 'Ocorreu um erro. Tente novamente!' : (lang === 'es' ? 'Ocurrió un error. ¡Intentar otra vez!' : 'An error occured. Try again!'))
            const successMessage = (lang === 'pt' ? 'Seu ticket foi criado com sucesso!' : (lang === 'es' ? '¡Su ticket fue creado con éxito!' : 'Your ticket was created successfully!'))
            await interaction.deferReply({ ephemeral: true })
            await this.client.database.updateOne({ name: 'config' }, { $inc: { technical: 1 } })
            const createdChannel = await TicketUtils.createTicket(interaction.guild, interaction.guild.roles.cache.get(config.roleAdministrator), interaction.user, lang, method, config.technical + 1, config.messageTicketCategory, interaction.guild.roles.everyone)
            if (!createdChannel) return interaction.followUp({ content: `> ${errorMessage}`, ephemeral: true })
            interaction.followUp({ content: `> ${successMessage} <#${createdChannel}>`, ephemeral: true })
            break;
          }
          case 'val': {
            const errorMessage = (lang === 'pt' ? 'Ocorreu um erro. Tente novamente!' : (lang === 'es' ? 'Ocurrió un error. ¡Intentar otra vez!' : 'An error occured. Try again!'))
            const successMessage = (lang === 'pt' ? 'Seu ticket foi criado com sucesso!' : (lang === 'es' ? '¡Su ticket fue creado con éxito!' : 'Your ticket was created successfully!'))

            await interaction.deferReply({ ephemeral: true })
            await this.client.database.updateOne({ name: 'config' }, { $inc: { validation: 1 } })
            const createdChannel = await TicketUtils.createTicket(interaction.guild, interaction.guild.roles.cache.get(config.roleAdministrator), interaction.user, lang, method, config.validation + 1, config.messageTicketCategory, interaction.guild.roles.everyone)
            if (!createdChannel) return interaction.followUp({ content: `> ${errorMessage}`, ephemeral: true })
            interaction.followUp({ content: `> ${successMessage} <#${createdChannel}>`, ephemeral: true })
            break;
          }
          case 'fin': {
            const errorMessage = (lang === 'pt' ? 'Ocorreu um erro. Tente novamente!' : (lang === 'es' ? 'Ocurrió un error. ¡Intentar otra vez!' : 'An error occured. Try again!'))
            const successMessage = (lang === 'pt' ? 'Seu ticket foi criado com sucesso!' : (lang === 'es' ? '¡Su ticket fue creado con éxito!' : 'Your ticket was created successfully!'))

            await interaction.deferReply({ ephemeral: true })
            await this.client.database.updateOne({ name: 'config' }, { $inc: { financial: 1 } })
            const createdChannel = await TicketUtils.createTicket(interaction.guild, interaction.guild.roles.cache.get(config.roleAdministrator), interaction.user, lang, method, config.financial + 1, config.messageTicketCategory, interaction.guild.roles.everyone)
            if (!createdChannel) return interaction.followUp({ content: `> ${errorMessage}`, ephemeral: true })
            interaction.followUp({ content: `> ${successMessage} <#${createdChannel}>`, ephemeral: true })
            break;
          }
        }
      }
    }

  }
}

module.exports = InteractionCreateEvent