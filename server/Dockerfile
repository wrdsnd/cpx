FROM node:16-alpine

WORKDIR /usr/app

COPY ./server/package.json ./server/package-lock.json ./
RUN npm ci

COPY ./server ./
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/src/main"]
