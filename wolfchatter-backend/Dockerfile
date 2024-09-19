# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the current directory contents into the container
COPY . .

# Expose port 4000
EXPOSE 4000

# Start the app
CMD ["npm", "start"]