# Use the official Node.js LTS image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
# This is done separately to leverage Docker's caching layers
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the application will use
EXPOSE 3000

# Command to run the application (development mode)
CMD ["npm", "start"]
