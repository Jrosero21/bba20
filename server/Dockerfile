FROM node:20

WORKDIR /app

# Use the package.json from the server folder
COPY ./server/package*.json ./

RUN npm install

# Copy all server code
COPY ./server ./

EXPOSE 3000

CMD ["node", "index.js"]
