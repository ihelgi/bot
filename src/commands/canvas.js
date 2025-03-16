const { createCanvas, registerFont } = require('canvas');
const { AttachmentBuilder } = require('discord.js');

registerFont('./src/fonts/Inter.ttc', { family: 'Inter' });

async function generateTextImage(text) {
    const width = 500;
    const height = 100;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Sfondo grigio scuro
    ctx.fillStyle = '#303030';
    ctx.fillRect(0, 0, width, height);

    // Calcolare la larghezza del testo per adattarlo alla canvas
    let fontSize = 50; // Impostiamo una dimensione di font iniziale
    ctx.font = `${fontSize}px Inter`;

    // Misurare la larghezza del testo
    let textWidth = ctx.measureText(text).width;

    // Ridurre la dimensione del font finché il testo non si adatta alla canvas
    while (textWidth > width - 40) { // 40 per lasciare un po' di margine
        fontSize -= 2; // Ridurre la dimensione del font
        ctx.font = `${fontSize}px Inter`;
        textWidth = ctx.measureText(text).width;
    }

    // Stile del testo
    ctx.fillStyle = '#FFFFFF'; // Testo bianco
    ctx.fillText(text, 20, height / 2 + fontSize / 4); // Centra verticalmente il testo

    // Convertire in buffer immagine
    const buffer = canvas.toBuffer();
    return new AttachmentBuilder(buffer, { name: 'text.png' });
}

async function handleCanvasCommand(message) {
    const text = message.content.slice(0, -2).trim(); // Rimuove gli ultimi due caratteri "()" dal messaggio
    if (!text) {
        return message.reply('Il messaggio è vuoto! Scrivi qualcosa prima di `()`.');
    }

    const image = await generateTextImage(text);
    await message.channel.send({ files: [image] });
}

module.exports = { handleCanvasCommand };