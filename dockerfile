# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=builder /app/dist ./dist

# Copy the node_modules folder from the previous stage
COPY --from=builder /app/node_modules ./node_modules

# Copy necessary files
COPY package*.json ./

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/src/main"]
