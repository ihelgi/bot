const axios = require('axios');
const translate = require('@vitalets/google-translate-api');  // Aggiungi questa libreria per la traduzione

async function handleAICommand(message) {
    try {
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: 'mistralai/Mistral-7B-Instruct-v0.1',
            messages: [{ role: 'user', content: message.content }],
            max_tokens: 100
        }, {
            headers: { 'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}` }
        });

        let reply = response.data.choices[0].message.content;

        // Tradurre la risposta in italiano
        translate(reply, { to: 'it' }).then(res => {
            message.reply(res.text);  // Risposta tradotta in italiano
        }).catch(err => {
            console.error("Errore nella traduzione:", err);
            message.reply("Errore nella traduzione!");
        });
        
    } catch (error) {
        console.error("Errore AI:", error);
        message.reply("Non riesco a rispondere ora. Riprova più tardi!");
    }
}

module.exports = { handleAICommand };