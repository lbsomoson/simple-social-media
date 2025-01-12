# Use the official Node.js image as a base
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Add .env.local for environment variables
COPY .env.local .env.local

# Expose the port for the React app
EXPOSE 3000

# Set the default command to run the React app
CMD ["npm", "start"]
