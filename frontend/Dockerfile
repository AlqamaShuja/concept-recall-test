# Use an official node image
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port Vite will run on
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]
