# Use a lightweight Node.js image for building the application
FROM node:14 as builder

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Install dependencies for building the Vite React application
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Vite React application
RUN npm run build

# Use a lightweight Node.js image to serve the built Vite app
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the built Vite app from the previous stage to the container
COPY --from=builder /app/dist /app/dist

# Expose the default HTTP port (optional)
EXPOSE 5000

# Start a simple HTTP server to serve the Vite app
# CMD ["npx", "http-server", "dist", "-p", "5000"]
CMD ["node", "run dev"]
