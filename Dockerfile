FROM node:latest

# Create app directory
WORKDIR /usr/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . . 

EXPOSE 3000

RUN apt-get update -y && apt-get install -y openssl
RUN npx prisma generate

CMD [ "npm", "run", "start:dev" ]