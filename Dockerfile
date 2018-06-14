FROM node:8
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . .
WORKDIR /usr/src/app/examples/simple-app
RUN yarn build
