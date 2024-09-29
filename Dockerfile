# Stage 1: Build the React app
FROM node:20 AS build

# Set working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the .env file (make sure it's in your root directory)
COPY .env .env

# Build the app (React will use the .env variables during this build step)
RUN npm run build

# Stage 2: Serve the build with nginx
FROM nginx:alpine

# Copy built React app to Nginx server's HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
