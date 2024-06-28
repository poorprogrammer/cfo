FROM mcr.microsoft.com/playwright:v1.44.1-jammy

# RUN npx -y playwright@1.44.1 install --with-deps
# RUN npx playwright install --with-deps


WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npx playwright install-deps chromium

# Set the entry point for the container
CMD ["npx", "playwright", "test"]