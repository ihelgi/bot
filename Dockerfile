FROM node:18-alpine

# Installa le dipendenze necessarie per skia-canvas
RUN apk add --no-cache python3 make g++ libc6-compat

# Imposta la cartella di lavoro
WORKDIR /app

# Copia il package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install --force

# Copia il resto dei file
COPY . .

# Comando di avvio
CMD ["node", "index.js"]