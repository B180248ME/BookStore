FROM node:20
WORKDIR /app
COPY ./ /app/Backend
WORKDIR /app/Backend
RUN npm install
EXPOSE 5555
CMD ["npm","start"]