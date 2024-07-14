# Stage 1: Build the Vite app
FROM node:20 as build

# Set working directory
WORKDIR /app

COPY ./ /app/Frontend
WORKDIR /app/Frontend

# Install dependencies
RUN npm install

# Build the Vite app
RUN npm run build

# Stage 2: Serve the built app with nginx
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=build /app/Frontend/dist /usr/share/nginx/html

# Copy the nginx configuration file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 3000

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]