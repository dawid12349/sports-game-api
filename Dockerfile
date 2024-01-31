FROM node:alpine as base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@latest
RUN npm install

COPY . . 

FROM base as local

CMD ["npm", "run", "start:dev"]

FROM base AS deployment

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm run build

USER node

CMD ["npm", "run", "start:prod"]
