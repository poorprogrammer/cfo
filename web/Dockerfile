# Build stage
FROM node:lts-alpine AS build
WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
ARG VUE_APP_BASE_API
ARG VUE_APP_KEYCLOAK_URL
ARG VUE_APP_KEYCLOAK_REALM
ARG VUE_APP_KEYCLOAK_CLIENT_ID
ENV VUE_APP_BASE_API=${VUE_APP_BASE_API}
ENV VUE_APP_KEYCLOAK_URL=${VUE_APP_KEYCLOAK_URL}
ENV VUE_APP_KEYCLOAK_REALM=${VUE_APP_KEYCLOAK_REALM}
ENV VUE_APP_KEYCLOAK_CLIENT_ID=${VUE_APP_KEYCLOAK_CLIENT_ID}
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN yarn build --mode production 

# Production stage with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=build /app/dist .
# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
