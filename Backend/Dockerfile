# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies and nodemon in one step
RUN npm install && npm install -g nodemon

# Copy the application files into the working directory
COPY . .

# Set the environment to production (optional)
ENV NODE_ENV=production

# Expose the application's port
EXPOSE 3000

# Define the entry point for the container
CMD ["npm", "start"]
