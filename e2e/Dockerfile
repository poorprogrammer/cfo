# FROM node:20-bookworm
FROM mcr.microsoft.com/playwright:v1.46.1-jammy
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
RUN npx playwright install chromium

COPY . .

# Set the entry point for the container
CMD ["npx", "playwright", "test"]