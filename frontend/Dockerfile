FROM node:latest

WORKDIR /root

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]