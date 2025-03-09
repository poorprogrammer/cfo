FROM node:lts-alpine AS build
WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
ARG VUE_APP_BASE_API
ENV VUE_APP_BASE_API=${VUE_APP_BASE_API}
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN yarn build --mode production 



FROM node:current-alpine3.12
WORKDIR /app
COPY --from=build /app/dist ./
RUN npm install -g serve
EXPOSE 8080
CMD [ "serve", "-s", "-L", "/app", "-p", "8080" ]
