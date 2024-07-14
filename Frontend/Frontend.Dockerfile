# Stage 1: Build the application
FROM node:20 as build
WORKDIR /app
COPY ./ /app/Frontend
WORKDIR /app/Frontend
RUN npm install
RUN npm run build

# Stage 2: Serve the application with nginx
FROM nginx:alpine
COPY --from=build /app/Frontend/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]