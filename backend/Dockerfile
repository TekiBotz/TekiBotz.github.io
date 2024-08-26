# Use Node.js 18.20.3 as the base image
FROM node:18.20.3

# Working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Start the application
CMD ["npm", "start"]
