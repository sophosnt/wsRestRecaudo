FROM node:8.12.0-alpine
WORKDIR /app
COPY package*.json ./
Run npm install
COPY . .
CMD node app.js
EXPOSE 3000
