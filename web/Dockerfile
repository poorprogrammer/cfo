FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VUE_APP_BASE_API
ENV VUE_APP_BASE_API=${VUE_APP_BASE_API}
RUN yarn build --mode production

FROM node:current-alpine3.12
WORKDIR /app
COPY --from=build /app/dist ./
RUN npm install -g serve
EXPOSE 5000
CMD [ "serve", "-s", "/app" ]
