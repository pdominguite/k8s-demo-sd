FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY server.js .

RUN npm install

RUN apk add fortune

EXPOSE 8080

CMD [ "node", "server.js" ]