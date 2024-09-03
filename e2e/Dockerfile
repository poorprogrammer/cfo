# FROM node:20-bookworm
FROM mcr.microsoft.com/playwright:v1.46.1-jammy
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npx playwright install chromium

# Set the entry point for the container
CMD ["npx", "playwright", "test"]