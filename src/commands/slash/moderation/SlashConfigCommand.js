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
              choices: [{ name: 'Portugues', value: 'br' }, { name: 'Ingles', value: 'us' }, { name: 'Espanhol', value: 'es' }, { name: 'Categoria', value: 'category' }, { name: 'Log', value: 'log' }]
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
              type: 'CHANNEL',
              name: 'canal',
              description: 'Canal selecionado',
              required: true
            }]
          },
          {
            type: 'SUB_COMMAND',
            name: 'invites',
            description: 'Canal responsável pelo log de timers',
            options: [{
              type: 'CHANNEL',
              name: 'canal',
              description: 'Canal selecionado',
              required: true
            }]
          }]
        },
        {
          type: 'SUB_COMMAND_GROUP',
          name: 'cargo',
          description: 'Configurações de cargos',
          options: [{
            type: 'SUB_COMMAND',
            name: 'idioma',
            description: 'Cargos dos idiomas',
            options: [{
              type: 'STRING',
              name: 'tipo',
              description: 'Qual cargo quer configurar',
              required: true,
              choices: [{ name: 'Portugues', value: 'br' }, { name: 'Ingles', value: 'us' }, { name: 'Espanhol', value: 'es' }]
            },
            {
              type: 'ROLE',
              name: 'cargo',
              description: 'Cargo Selecionado',
              required: true
            }]
          },
          {
            type: 'SUB_COMMAND',
            name: 'administrador',
            description: 'Cargo dos administradores',
            options: [
              {
                type: 'ROLE',
                name: 'cargo',
                description: 'Canal selecionado',
                required: true
              }]
          }]
        },
        {
          type: 'SUB_COMMAND_GROUP',
          name: 'convites',
          description: 'Configurações de convites',
          options: [{
            type: 'SUB_COMMAND',
            name: 'adicionar',
            description: 'Adicionar um convite',
            options: [{
              type: 'STRING',
              name: 'codigo',
              description: 'Código do Convite',
              required: true,
            },
            {
              type: 'STRING',
              name: 'nome',
              description: 'Nome para este convite',
              required: true
            }]
          },
          {
            type: 'SUB_COMMAND',
            name: 'remover',
            description: 'Remover um convite',
            options: [{
              type: 'STRING',
              name: 'codigo',
              description: 'Código do Convite',
              required: true,
            },
            ]
          },
          ]
        }
      ],
      category: 'moderation',
      UserPermission: ['ADMINISTRATOR'],
      ClientPermissions: ['SEND_MESSAGES', 'SEND_LINKS'],
    })
  }

  async run(ctx) {
    if (ctx.options.getSubcommandGroup() === 'canal') {
      if (ctx.options.getSubcommand() === 'ticket') {
        switch (ctx.options.getString('tipo')) {
          case 'br': {
            await this.client.database.updateOne({ name: 'config' }, { messageTicketBR: ctx.options.getChannel('canal').id })
            break;
          }
          case 'us': {
            await this.client.database.updateOne({ name: 'config' }, { messageTicketUS: ctx.options.getChannel('canal').id })
            break;
          }
          case 'es': {
            await this.client.database.updateOne({ name: 'config' }, { messageTicketES: ctx.options.getChannel('canal').id })
            break;
          }
          case 'category': {
            await this.client.database.updateOne({ name: 'config' }, { messageTicketCategory: ctx.options.getChannel('canal').id })
            break;
          }
          case 'log': {
            await this.client.database.updateOne({ name: 'config' }, { messageTicketLog: ctx.options.getChannel('canal').id })
            break;
          }
        }
        return this.respond(ctx, `O canal <#${ctx.options.getChannel('canal').id}> foi settado para a opção ${ctx.options.getString('tipo')}!`)
      } else if (ctx.options.getSubcommand() === 'idioma') {
        await this.client.database.updateOne({ name: 'config' }, { messageLang: ctx.options.getChannel('canal').id })
        return this.respond(ctx, `O canal <#${ctx.options.getChannel('canal').id}> foi settado para mensagem do idioma!`)
      } else {
        await this.client.database.updateOne({ name: 'config' }, { messageInviter: ctx.options.getChannel('canal').id })
        return this.respond(ctx, `O canal <#${ctx.options.getChannel('canal').id}> foi settado para mensagem do invite log!`)
      }
    }

    if (ctx.options.getSubcommandGroup() === 'cargo') {
      if (ctx.options.getSubcommand() === 'idioma') {
        switch (ctx.options.getString('tipo')) {
          case 'br': {
            await this.client.database.updateOne({ name: 'config' }, { roleLangBR: ctx.options.getRole('cargo').id })
            break;
          }
          case 'us': {
            await this.client.database.updateOne({ name: 'config' }, { roleLangUS: ctx.options.getRole('cargo').id })
            break;
          }
          case 'es': {
            await this.client.database.updateOne({ name: 'config' }, { roleLangES: ctx.options.getRole('cargo').id })
            break;
          }
        }
        return this.respond(ctx, `O cargo <@&${ctx.options.getRole('cargo').id}> foi settado para o idioma ${ctx.options.getString('tipo')} !`)
      }

      await this.client.database.updateOne({ name: 'config' }, { roleAdministrator: ctx.options.getRole('cargo').id })

      return this.respond(ctx, `O cargo <@&${ctx.options.getRole('cargo').id}> foi settado para administrador!`)
    }

    const config = await this.client.database.findOne({ name: 'config' })

    if (ctx.options.getSubcommand() === 'adicionar') {
      const code = ctx.options.getString('codigo')
      const name = ctx.options.getString('nome')

      const exists = config.invites.some(a => a.code === code)
      if (exists) return this.respond(ctx, 'Este código já existe nos convites!')

      config.invites.push({ name, code, uses: 0 })
      await config.save()
      return this.respond(ctx, `O código \`${code}\` foi adicionado com o nome **${name}**`)
    }

    const code = ctx.options.getString('codigo')

    const exists = config.invites.some(a => a.code === code)
    if (!exists) return this.respond(ctx, 'Este código não existe nos convites!')

    await this.client.database.updateOne({ name: 'config' }, { $pull: { invites: { code } } })
    return this.respond(ctx, `O código \`${code}\` foi removido dos convites!`)
  }

  async respond(ctx, text) {
    ctx.reply(text)
  }
}

module.exports = ConfigSlashCommand