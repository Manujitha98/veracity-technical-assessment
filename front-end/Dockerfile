# Use an official Node runtime as a parent image
FROM node

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY . .

# Build the app for production
RUN npm run build

# Expose the container's port 3000 for serving the app
EXPOSE 3000

# Define the command to run the app using serve
CMD ["npx", "serve", "-s", "build", "-l", "3000"]