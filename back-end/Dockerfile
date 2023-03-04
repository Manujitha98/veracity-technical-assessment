# Use an official Node.js runtime as a parent image
FROM node

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

#env variables
ENV JWT_PRIVATE_KEY=4djashdkjashddh2343423aidhsaiudh \
    PORT=8000 

#expose port 
EXPOSE 8000

# Compile TypeScript code to JavaScript
RUN npm run build

# Install pm2 globally
RUN npm install -g pm2

# Start the app with pm2
CMD ["pm2-runtime", "build/index.js"]
