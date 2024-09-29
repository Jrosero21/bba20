FROM node:20

WORKDIR /app

# Use the package.json directly (since we're already in the server folder)
COPY package*.json ./

RUN npm install

# Copy all server code
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
