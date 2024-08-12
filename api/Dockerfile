# Use the official Node.js image from the Docker Hub
FROM node:22.2.0

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]