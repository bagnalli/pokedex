# Use the specific Node.js version
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the application files to the container's /app directory
COPY ./ /app/

# Install Node.js dependencies
RUN npm ci

# Set the command to run your Node.js application
CMD ["node", "server.js"]

# Expose the application's port
EXPOSE 3000
