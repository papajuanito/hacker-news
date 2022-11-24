FROM node:16.15-alpine

USER node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node . .

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["node", "./build/server.js"]
