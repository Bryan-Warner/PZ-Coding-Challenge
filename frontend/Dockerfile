# Stage 1: Build the React application
FROM node:14 as builder

# Set the working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install all dependencies
RUN npm install

# Copy the rest of your frontend code into the Docker container
COPY . .

# Build your React application
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine

# Copy the built static files from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 to access the container
EXPOSE 80

# Run Nginx to serve the static files
CMD ["nginx", "-g", "daemon off;"]
