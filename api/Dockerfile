FROM node:12.6.0-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production
# If you are building your code for production
# RUN npm ci --only=production

COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]
