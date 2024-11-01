FROM node:22.9-alpine

WORKDIR /home/app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm","start"]