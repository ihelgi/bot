require('dotenv').config();
const { Client, IntentsBitField, ActivityType, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { handleWeatherCommand } = require('./weather');
const { handleLatencyCommand } = require('./latency');
const { handleExchangeRateCommand } = require('./currency');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.once('ready', () => {
    console.log(`${client.user.username} è online.`);

    client.user.setActivity({
        name: 'Lethal Company',
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=biYGBhcYOCY',
    });

    client.user.setPresence({ status: "dnd" });
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) {
        return;
    }

    handleLatencyCommand(message, client);
    
    if (message.content.startsWith('meteo')) {
        await handleWeatherCommand(message);
    }

    if (message.content.startsWith('cambio')) {
        await handleExchangeRateCommand(message);
    }

    if (message.content === 'ping') {
      message.reply('pong');
    }
    if (message.content === 'pong') {
        message.reply('ping');
    }
    if (message.content === 'hip hip') {
        message.reply('urrà');
    }
    if (message.content === 'khiem') {
        const khiem = new EmbedBuilder()
        .setColor('Random')
        .setTitle("Khiem Del Giovane")
        .setDescription("Conosciuto anche con il nome eucaliptopianta o eucalipto, va in bici")
        .addFields(
            { name: 'Data di nascita', value: '12/04/1986', inline: true},
            { name: 'Luogo di nascita', value: 'Tor Pignattara', inline: true }
        )
        .setImage('https://imgur.com/a/oqkUC01')

        message.channel.send({ embeds: [khiem] });
    }
    if (message.content === 'trifase') {
        const trifase = new EmbedBuilder()
        .setColor('Random')
        .setTitle("Francesco Fantilli")
        .setDescription("Conosciuto anche con il nome trifase o trfase, è campione nazionale di scherma")
        .addFields(
            { name: 'Data di nascita', value: '12.5/11/2015', inline: true},
            { name: 'Luogo di nascita', value: 'Busto Arsizio', inline: true }
        )

        message.channel.send({ embeds: [trifase] });
    }
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'badge') {
        interaction.reply('for the badge!');
    }
    if (interaction.commandName === 'embed') {
        const embed = new EmbedBuilder()
        .setTitle("Embed title")
        .setDescription("Embed description")
        .setColor('Random')
        .addFields({
            name: 'Field title',
            value: 'Some random value',
            inline: true,
        }, {
            name: 'Field title',
            value: 'Some random value',
            inline: true,
        });

        interaction.reply({ embeds: [embed] });
    }
});

client.login(process.env.TOKEN);