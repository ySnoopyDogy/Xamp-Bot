const Client = require('./structures/Client')

const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'],
});

client.loadCommands(`${__dirname}/commands/text`);
client.loadSlashCommands(`${__dirname}/commands/slash`)
client.loadEvents(`${__dirname}/events`);
client
  .login(process.env.TOKEN)
  .then(() => {
    console.log('Bot Conectado com sucesso');
  })
  .catch(e => console.error(`Erro ao se conectar com o Discord: ${e.message}`));