FROM node:18-bullseye

# Installa le dipendenze richieste
RUN apt-get update && apt-get install -y python3 make g++ libc6

WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .

CMD ["node", "index.js"]