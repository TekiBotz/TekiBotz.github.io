# Stage 1: Build the application using Node.js 18.20.3
FROM node:18.20.3 AS build

# Define an argument for the backend URL that can be passed during build time
ARG VITE_BACKEND_URL=http://localhost:3000/api/v1

# Working directory inside the container
WORKDIR /build

# Copy package.json and package-lock.json to the container
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the entire application code to the working directory
COPY . .

# Create static build of Vite app
RUN npm run build

# Stage 2: Serve the static files using Nginx
FROM nginx AS final

# Set the working directory inside the container to the default Nginx HTML directory
WORKDIR /usr/share/nginx/html

# Copy the static files from the build stage to the Nginx HTML directory
COPY --from=build /build/dist .