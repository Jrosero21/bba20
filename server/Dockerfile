FROM node:16

# Set working directory to app folder in container
WORKDIR /app

# Copy all files from project root into the container's /app folder
COPY ../package*.json ./  # Move up one level to copy from root
COPY ../ ./

# Install the dependencies
RUN npm install

# Expose backend port
EXPOSE 3000

# Start the server
CMD ["node", "index.js"]
