FROM node:8
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . .

# Build the storybook as test
RUN yarn build

# Build the example app as test
WORKDIR /usr/src/app/examples/simple-app
RUN yarn build
