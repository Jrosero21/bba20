FROM node:20

WORKDIR /app

COPY ../package*.json ./  # Move up one level to copy the package.json from root
RUN npm install

COPY . .                  # Copy all files from the current folder into the container
EXPOSE 3000
CMD ["node", "index.js"]
