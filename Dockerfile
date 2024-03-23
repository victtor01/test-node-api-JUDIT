FROM node:alpine

WORKDIR /usr/app

COPY package.json ./

RUN npm install
#RUN npm install -g @nestjs/cli

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]