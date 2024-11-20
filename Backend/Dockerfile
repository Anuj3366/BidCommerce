# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the application files into the working directory
COPY . .

# Install nodemon globally
RUN npm install -g nodemon

# Expose the port that your application will run on
EXPOSE 3000

# Define the entry point for the container
CMD ["npm", "start"]