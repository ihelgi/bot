const { EmbedBuilder } = require('discord.js');

// Funzione per creare l'embed della latenza
const createLatencyEmbed = (ping) => {
    return new EmbedBuilder()
        .setColor('#0099ff')
        .setDescription(`La latenza del bot è di **${ping}ms**.`)
};

// Funzione per gestire il comando della latenza
const handleLatencyCommand = (message, client) => {
    if (message.content === 'latenza') {
        const ping = client.ws.ping; // ottieni la latenza
        const latencyEmbed = createLatencyEmbed(ping); // crea l'embed
        message.channel.send({ embeds: [latencyEmbed] }); // invia l'embed
    }
};

module.exports = { handleLatencyCommand };