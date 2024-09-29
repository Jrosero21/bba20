# server/Dockerfile
FROM node:20

WORKDIR /app
COPY package*.json ./  # Copies the package.json to install dependencies
RUN npm install
COPY . .  # Copies all backend source code
EXPOSE 3000
CMD ["node", "index.js"]
