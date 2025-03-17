const { Canvas, loadImage } = require("skia-canvas");

const getRandomColor = () => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD', '#1ABC9C'];
    return colors[Math.floor(Math.random() * colors.length)];
};

const getRandomFont = () => {
    const fonts = ['Arial', 'Verdana', 'Georgia', 'Times New Roman', 'Courier New'];
    return fonts[Math.floor(Math.random() * fonts.length)];
};

const getRandomShadow = () => {
    const shadowColors = ['#2C3E50', '#BDC3C7', '#95A5A6'];
    return {
        color: shadowColors[Math.floor(Math.random() * shadowColors.length)],
        blur: Math.floor(Math.random() * 15) + 5,
        offsetX: Math.floor(Math.random() * 10) - 5,
        offsetY: Math.floor(Math.random() * 10) - 5,
    };
};

const getRandomBackground = () => {
    const bgColors = ['#F39C12', '#8E44AD', '#3498DB', '#1ABC9C', '#E74C3C'];
    return bgColors[Math.floor(Math.random() * bgColors.length)];
};

const getRandomShape = (ctx, canvas) => {
    const shapes = ['circle', 'rectangle'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    ctx.fillStyle = getRandomColor();
    ctx.strokeStyle = getRandomColor();
    ctx.lineWidth = 5;

    if (shape === 'circle') {
        const radius = Math.floor(Math.random() * 50) + 20;
        const x = Math.floor(Math.random() * (canvas.width - radius * 2)) + radius;
        const y = Math.floor(Math.random() * (canvas.height - radius * 2)) + radius;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    } else if (shape === 'rectangle') {
        const x = Math.floor(Math.random() * (canvas.width - 100));
        const y = Math.floor(Math.random() * (canvas.height - 100));
        const width = Math.floor(Math.random() * 150) + 50;
        const height = Math.floor(Math.random() * 150) + 50;
        ctx.fillRect(x, y, width, height);
    }
};

const handleCanvasCommand = async (message) => {
    const text = message.content.slice(0, -2); // Remove "()" from command
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext('2d');

    // Set random background
    ctx.fillStyle = getRandomBackground();
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set random font and color
    ctx.font = `${Math.floor(Math.random() * 30) + 20}px ${getRandomFont()}`;
    ctx.fillStyle = getRandomColor();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Set random shadow
    const shadow = getRandomShadow();
    ctx.shadowColor = shadow.color;
    ctx.shadowBlur = shadow.blur;
    ctx.shadowOffsetX = shadow.offsetX;
    ctx.shadowOffsetY = shadow.offsetY;

    // Add random shape around text
    getRandomShape(ctx, canvas);

    // Draw text
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    // Send image to Discord
    const buffer = canvas.toBuffer();
    await message.channel.send({ files: [{ attachment: buffer, name: 'canvas.png' }] });
};

module.exports = { handleCanvasCommand };