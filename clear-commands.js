require('dotenv/config');
const { REST, Routes } = require('discord.js');
const { TOKEN, CLIENT_ID } = process.env;

const rest = new REST({ version: '10' }).setToken(TOKEN);

function clearGlobalCommands() {
  console.log('Eliminando i comandi...');

  rest
    .put(Routes.applicationCommands(CLIENT_ID), { body: [] })
    .then(() => console.log('Comandi eliminati.'))
    .catch(console.error);
}

function clearGuildCommands(guildId) {
  if (!guildId) throw new Error('Devi fornire il server ID.');

  console.log('Eliminando i comandi...');

  rest
    .put(Routes.applicationGuildCommands(CLIENT_ID, guildId), { body: [] })
    .then(() => console.log(`Comandi eliminati per il server "${guildId}".`))
    .catch(console.error);
}

clearGlobalCommands();

clearGuildCommands('774941531685519360');