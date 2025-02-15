const axios = require('axios');

async function handleAICommand(message) {
    try {
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
    model: "mistralai/Mistral-7B-Instruct-v0.1",
    messages: [{ role: "user", content: "ai" }],
    max_tokens: 100,
}, {
    headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API}`,
        'Content-Type': 'application/json',
    },
});

        const reply = response.data.choices[0].message.content;
        message.reply(reply);
    } catch (error) {
        console.error("Errore AI:", error);
        message.reply("Non riesco a rispondere ora. Riprova più tardi!");
    }
}

module.exports = { handleAICommand };