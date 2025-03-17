# Usa un'immagine Node.js con Alpine Linux (leggero)
FROM node:18-alpine

# Installa le dipendenze necessarie per skia-canvas
RUN apk add --no-cache \
  cairo-dev \
  pango-dev \
  giflib-dev \
  pixman-dev \
  g++ \
  make \
  python3

# Crea una cartella per il bot
WORKDIR /app

# Copia package.json e package-lock.json prima di installare
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il codice del bot
COPY . .

# Specifica la variabile d'ambiente (opzionale, Railway la imposta automaticamente)
ENV NODE_ENV=production

# Avvia il bot
CMD ["node", "index.js"]