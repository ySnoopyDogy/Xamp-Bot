const Command = require("../../../structures/MessageCommand");
const { MessageEmbed, MessageSelectMenu } = require('discord.js')

class PingCommand extends Command {
  constructor(client) {
    super(client, 'config', {
      category: 'moderation',
      UserPermission: ['ADMINISTRATOR'],
      ClientPermissions: ['SEND_MESSAGES', 'SEND_LINKS'],
    })
  }

  async run(ctx) {
    if (!ctx.args || ctx.args.length === 0) {
      const noArgsEmbed = new MessageEmbed()
        .setColor('BLURPLE')
        .setTitle('⚙️ | Escolha o que você quer configurar')
        .setDescription(`Lembrando que você pode configurar direto usando \`${process.env.PREFIX}config <opção> <valor>\``)


      const selectOption = new MessageSelectMenu()
        .setCustomId(`${ctx.message.id} | SELECT`)
        .setPlaceholder('Selecione a Opção')
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions([{
          label: 'Canal Escolha Idioma',
          value: 'channel-lang',
          description: 'O ID do canal responsável por selecionar os idiomas',
          emoji: '🌐'
        }, {
          label: 'ID Cargo Inglês',
          value: 'role-english',
          description: 'O ID do cargo que define o idioma do usuário para o Inglês',
          emoji: '🇺🇸',
        },
        {
          label: 'ID Cargo Portugûes',
          value: 'role-portuguese',
          description: 'O ID do cargo que define o idioma do usuário para o português',
          emoji: '🇧🇷'
        },
        {
          label: 'Canal Ticket BR',
          value: 'channel-ticket-br',
          description: 'O ID do canal para a Mensagem do ticket em portugues',
          emoji: '📗'
        },
        {
          label: 'Canal Ticket US',
          value: 'channel-ticket-us',
          description: 'O ID do canal para a Mensagem do ticket em inglês',
          emoji: '📘'
        },
        {
          label: 'Categoria Tickets',
          value: 'category-ticket',
          description: 'O ID da categoria que todos tickets serão criados',
          emoji: '🗄️'
        },
        ])

      ctx.reply({ embeds: [noArgsEmbed], components: [{ type: 1, components: [selectOption] }] })
    }
  }
}

module.exports = PingCommand