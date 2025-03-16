const sharp = require('sharp');
const { AttachmentBuilder } = require('discord.js');

async function generateTextImage(text) {
    const width = 500;
    const height = 100;
    const fontSize = 50;
    
    // Creiamo un'immagine di base con un colore di sfondo grigio scuro
    const image = await sharp({
        create: {
            width: width,
            height: height,
            channels: 4,
            background: { r: 48, g: 48, b: 48, alpha: 1 }, // Grigio scuro
        }
    })
    .png() // Salviamo l'immagine come PNG
    .composite([{
        input: Buffer.from(`
        <svg width="${width}" height="${height}">
            <text x="20" y="${height / 2 + fontSize / 4}" font-family="Inter" font-size="${fontSize}" fill="white">${text}</text>
        </svg>
        `),
        gravity: 'center',
    }])
    .toBuffer();

    // Creiamo l'Attachment da inviare su Discord
    return new AttachmentBuilder(image, { name: 'text.png' });
}

async function handleCanvasCommand(message) {
    const text = message.content.slice(0, -2).trim(); // Rimuove gli ultimi due caratteri "()" dal messaggio
    console.log('Testo ricevuto:', text);  // Aggiungi questa riga per il debug
    if (!text) {
        return message.reply('Il messaggio è vuoto! Scrivi qualcosa prima di `()`.');
    }

    const image = await generateTextImage(text);
    await message.channel.send({ files: [image] });
}

module.exports = { handleCanvasCommand };