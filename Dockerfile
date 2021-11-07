FROM node:17-alpine

WORKDIR /home/app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm","start"]