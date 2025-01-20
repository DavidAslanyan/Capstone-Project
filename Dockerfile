FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g typeorm @nestjs/cli

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:dev"]