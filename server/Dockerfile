FROM node:12-alpine

WORKDIR /usr/app

COPY ./server/package.json ./server/yarn.lock ./
RUN yarn

COPY ./server ./
RUN yarn build

EXPOSE 3000

CMD ["node", "dist/src/main"]
