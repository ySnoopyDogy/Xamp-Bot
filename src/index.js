const Client = require('./structures/Client')
require('./structures/Database')

const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES'],
});

client.loadCommands(`${__dirname}/commands`);
client.loadEvents(`${__dirname}/events`);
client
  .login(process.env.TOKEN)
  .then(() => {
    console.log('Bot Conectado com sucesso');
  })
  .catch(e => console.error(`Erro ao se conectar com o Discord: ${e.message}`));