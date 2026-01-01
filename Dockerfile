# Build stage - Create the production build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the production bundle
RUN npm run build

# The build output is now in /app/dist
# You can copy it out using: docker cp <container>:/app/dist ./dist
