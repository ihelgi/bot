const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

// Mappatura delle valute comuni con i codici ISO
const currencyMap = {
    'euro': 'EUR',
    'dollaro': 'USD',
    'yen': 'JPY',
    'sterlina': 'GBP',
    'franco': 'CHF',
    'rublo': 'RUB',
    'yuan': 'CNY',
    'lira': 'TRY',
    // Aggiungi altre valute qui se necessario
};

// Funzione per ottenere il tasso di cambio tra Euro e una valuta di destinazione
async function getExchangeRate(baseCurrency, targetCurrency) {
    const apiKey = process.env.EXCHANGE_API; // Aggiungi la tua API Key di Exchangerate-API
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`;  // API endpoint per il tasso di cambio

    try {
        const response = await axios.get(url);
        const rate = response.data.conversion_rates[targetCurrency.toUpperCase()]; // Ottieni il tasso di cambio per la valuta di destinazione
        if (rate) {
            return rate;
        } else {
            throw new Error('Valuta non supportata o errore nel recupero del tasso di cambio.');
        }
    } catch (error) {
        console.error('Errore nel recupero del tasso di cambio:', error);
        throw new Error('Non sono riuscito a ottenere il tasso di cambio. Riprova più tardi.');
    }
}

// Funzione per creare l'embed del tasso di cambio
const createExchangeRateEmbed = (baseCurrency, targetCurrency, rate) => {
    return new EmbedBuilder()
        .setColor('#0099ff')
        .setDescription(`**1 ${baseCurrency.toUpperCase()}** = **${rate} ${targetCurrency.toUpperCase()}**`)
        .setFooter({ text: 'Fonte: Exchangerate' });
};

// Funzione per gestire il comando del cambio
const handleExchangeRateCommand = async (message) => {
    const args = message.content.slice(6).trim(); // Ottieni l'argomento dopo "cambio"
    const [baseCurrency, targetCurrency] = args.split(' ');  // Split tra valute (esempio: "euro dollaro")

    // Controlla se la valuta di partenza e quella di destinazione esistono nella mappatura
    if (!currencyMap[baseCurrency.toLowerCase()] || !currencyMap[targetCurrency.toLowerCase()]) {
        return message.reply('Per favore, specifica valute valide. Esempio: `cambio euro dollaro`');
    }

    try {
        const baseCurrencyCode = currencyMap[baseCurrency.toLowerCase()];
        const targetCurrencyCode = currencyMap[targetCurrency.toLowerCase()];
        const rate = await getExchangeRate(baseCurrencyCode, targetCurrencyCode); // Ottieni il tasso di cambio
        const exchangeRateEmbed = createExchangeRateEmbed(baseCurrencyCode, targetCurrencyCode, rate); // Crea l'embed con il tasso di cambio
        message.channel.send({ embeds: [exchangeRateEmbed] }); // Invia l'embed
    } catch (error) {
        message.reply(error.message || 'C\'è stato un errore nel recupero del tasso di cambio.');
    }
};

module.exports = { handleExchangeRateCommand };