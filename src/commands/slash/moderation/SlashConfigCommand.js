const SlashCommand = require("../../../structures/SlashCommand");

class ConfigSlashCommand extends SlashCommand {
  constructor(client) {
    super(client, {
      name: 'config',
      description: 'Configure os comandos do bot',
      type: 'CHAT_INPUT',
      options: [
        {
          type: 'SUB_COMMAND_GROUP',
          name: 'canal',
          description: 'Configurações de canais',
          options: [{
            type: 'SUB_COMMAND',
            name: 'ticket',
            description: 'Canais responsáveis pelas mensagens de ticket',
            options: [{
              type: 'STRING',
              name: 'tipo',
              description: 'Qual canal quer configurar',
              required: true,
              choices: [{ name: 'portugues', value: 'br' }, { name: 'ingles', value: 'us' }]
            },
            {
              type: 'CHANNEL',
              name: 'canal',
              description: 'Canal selecionado',
              required: true
            }]
          },
          {
            type: 'SUB_COMMAND',
            name: 'idioma',
            description: 'Canais responsáveis pelas mensagens de idioma',
            options: [{
              type: 'STRING',
              name: 'tipo',
              description: 'Qual cargo quer configurar',
              required: true,
              choices: [{ name: 'portugues', value: 'br' }, { name: 'ingles', value: 'us' }]
            },
            {
              type: 'ROLE',
              name: 'cargo',
              description: 'Canal selecionado',
              required: true
            }]
          }]
        }
      ],
      category: 'moderation',
      UserPermission: ['ADMINISTRATOR'],
      ClientPermissions: ['SEND_MESSAGES', 'SEND_LINKS'],
    })
  }

  async run(ctx) {
    ctx.reply('Eae', true)
  }
}

module.exports = ConfigSlashCommand