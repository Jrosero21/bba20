FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy files from server directory (context: ./server) into the container
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install

# Expose the backend port
EXPOSE 3000

# Run the backend server
CMD ["node", "index.js"]
