FROM node:20-bookworm

RUN npx -y playwright@1.45.0 install --with-deps
# RUN npx playwright install --with-deps


WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# RUN npx playwright install-deps chromium

# Set the entry point for the container
CMD ["npx", "playwright", "test"]