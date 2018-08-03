FROM node:8
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . .

# Build the storybook as test
RUN yarn build

WORKDIR /usr/src/app
EXPOSE 9001
CMD ["yarn", "start"]
