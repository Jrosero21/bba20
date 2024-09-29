FROM node:20

WORKDIR /app

# Copy package.json and package-lock.json from the server folder
COPY package*.json ./

RUN npm install

# Copy all server code
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]

