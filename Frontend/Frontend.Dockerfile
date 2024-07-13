FROM node:20
WORKDIR /app
COPY ./ /app/Frontend
WORKDIR /app/Frontend
RUN npm install
EXPOSE 3000
CMD ["npm","start"]