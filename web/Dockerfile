FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN yarn build --mode production

FROM node:current-alpine3.12
WORKDIR /app
COPY --from=build /app/dist ./
RUN npm install -g serve
EXPOSE 5000
CMD [ "serve", "-s", "/app" ]
