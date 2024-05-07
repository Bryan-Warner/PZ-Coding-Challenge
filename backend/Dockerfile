# Use a base image with Node.js to build the application
FROM node:14 as builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Build the application if needed
# RUN npm run build (uncomment if you have a build script)

# Start a new stage from a smaller base image
FROM node:14-slim

WORKDIR /app

# Copy built node modules and other dependencies from the builder stage
COPY --from=builder /app .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]
