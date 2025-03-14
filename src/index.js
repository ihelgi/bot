require('dotenv').config();
const { Client, IntentsBitField, ActivityType, GatewayIntentBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { handleWeatherCommand } = require('./commands/weather');
const { handleLatencyCommand } = require('./commands/latency');
const { handleExchangeRateCommand } = require('./commands/currency');
const { handleAICommand } = require('./commands/ai');
const { handleCanvasCommand } = require('./commands/canvas');

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

    if (message.content.endsWith('()')) {
        await handleCanvasCommand(message);
    }

    // Comando AI
    if (message.content.trim().endsWith('?')) {
        await handleAICommand(message, message.content.trim());
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
        .setDescription("Conosciuto anche con il nome eucaliptopianta o eucalipto, si è ritirato da tutte le competizioni ciclistiche (se ne vanno sempre i migliori)")
        .addFields(
            { name: 'Data di nascita', value: '12/04/1986', inline: true},
            { name: 'Luogo di nascita', value: 'Tor Pignattara', inline: true }
        )
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
    if (message.content === 'lud') {
        const lud = new EmbedBuilder()
        .setColor('Random')
        .setTitle("Ludovica Mascarino")
        .setDescription("Conosciuta anche con il nome cavità dentale o lidl, è pro gamer di hoyoverse")
        .addFields(
            { name: 'Data di nascita', value: '42/13/2137 (Era un giorno fantastico!)', inline: true},
            { name: 'Luogo di nascita', value: 'Vercelli (la città dei sogni)', inline: true }
        )
        .setFooter({ text: "Chi dice che non esistono leggende?" });
        message.channel.send({ embeds: [lud] });
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