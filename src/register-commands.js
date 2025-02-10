require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'badge',
    description: 'just for the badge',
  },
  {
    name: 'embed',
    description: 'sends an embed',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registrando i comandi slash...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Comandi slash registrati');
  } catch (error) {
    console.log(`C'è stato un errore: ${error}`);
  }
})();