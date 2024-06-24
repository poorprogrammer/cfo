FROM node:20-bookworm

RUN npx -y playwright@1.44.1 install --with-deps

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Set the entry point for the container
CMD ["npx", "playwright", "test"]