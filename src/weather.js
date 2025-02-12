const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

// Funzione per creare l'embed del meteo
const createWeatherEmbed = (
    temp,
    maxTemp,
    minTemp,
    pressure,
    humidity,
    wind,
    cloudness,
    icon,
    cityName,
    country
) =>
    new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`Meteo per ${cityName}, ${country}`)
        .setDescription(`La temperatura attuale è di **${temp}°C**.`)
        .addFields(
            { name: '🌡️ Max', value: `${maxTemp}°C`, inline: true },
            { name: '🌡️ Min', value: `${minTemp}°C`, inline: true },
            { name: '💧 Umidità', value: `${humidity}%`, inline: true },
            { name: '🌬️ Vento', value: `${wind} m/s`, inline: true },
            { name: '🧭 Pressione', value: `${pressure} hPa`, inline: true },
            { name: '☁️ Nuvole', value: `${cloudness}`, inline: true }
        )
        .setThumbnail(`http://openweathermap.org/img/w/${icon}.png`)
        .setFooter({ text: 'Fonte: OpenWeather' });

// Funzione per ottenere i dati meteo
async function getWeather(cityName) {
    const apiKey = process.env.WEATHER_API; // Assicuriamoci che la chiave sia configurata come variabile d'ambiente
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},IT&units=metric&lang=it&appid=${apiKey}`;

    try {
        // Prima prova con l'Italia
        let response = await axios.get(apiUrl);
        
        // Se la città non è trovata, prova senza specificare il paese
        if (response.data.cod === '404') {
            apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=it&appid=${apiKey}`;
            response = await axios.get(apiUrl);
        }

        const data = response.data;

        const currentTemp = Math.ceil(data.main.temp);  // Arrotondamento
        const maxTemp = Math.round(data.main.temp_max);
        const minTemp = Math.round(data.main.temp_min);
        const humidity = data.main.humidity;
        const wind = Math.round(data.wind.speed);
        const icon = data.weather[0].icon;
        const country = data.sys.country;
        const pressure = data.main.pressure;
        const cloudness = data.weather[0].description;

        return createWeatherEmbed(
            currentTemp,
            maxTemp,
            minTemp,
            pressure,
            humidity,
            wind,
            cloudness,
            icon,
            cityName,
            country
        );
    } catch (error) {
        console.error('Errore nel recupero dei dati meteo:', error);
        throw new Error('Non sono riuscito a ottenere i dati meteo. Assicurati che la città sia valida.');
    }
}

// Funzione per gestire il comando meteo
const handleWeatherCommand = async (message) => {
    const args = message.content.slice(6).trim(); // Rimuove '!meteo' e ottiene la città
    if (!args) {
        return message.reply('Per favore, specifica una città. Esempio: `meteo Roma`');
    }

    try {
        const weatherEmbed = await getWeather(args);  // Ottieni i dati meteo
        message.channel.send({ embeds: [weatherEmbed] });  // Invia l'embed
    } catch (error) {
        message.reply(error.message || 'C\'è stato un errore nel recupero del meteo.');
    }
};

module.exports = { handleWeatherCommand };