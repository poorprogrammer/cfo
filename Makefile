.PHONY: dev dev-api dev-web install e2e e2e-ci test-web e2e-cucumber keycloak load-data

# Default target
dev: dev-api dev-web

# Install dependencies for both services
install:
	cd api && bun install
	cd web && bun install

# Start API in development mode (in background)
dev-api: install
	cd api && bun tests/fixtures/loadData.js && bun src/server.js &

# Start web in development mode
dev-web: install keycloak
	cd web && bun run serve &

# Stop all development servers
stop:
	pkill -f 'node.*api'
	pkill -f 'vue-cli-service serve'

# Clean install and start development
fresh: stop install dev

e2e:
	cd e2e && DEV=true npx playwright test

# Load data into the server
load-data:
	rm -rf /tmp/cfo/* &
	cd api && node tests/fixtures/loadData.js

# Run end-to-end tests in development environment
e2e-cucumber: load-data dev
	cd e2e && DEV=true npm run test:cucumber || true
	$(MAKE) stop

	
	
# Run end-to-end tests in CI environment
e2e-ci:
	cd compose/test-ci/ && docker-compose build e2e
	cd compose/test-ci/ && docker-compose run --rm e2e
	cd compose/test-ci/ && docker-compose build e2e_cucumber
	cd compose/test-ci/ && docker-compose run --rm e2e_cucumber
	cd compose/test-ci/ && docker-compose stop

test-web:
	cd web && npm run test:single

test-web-ci:
	cd web && npm run test:coverage

keycloak:
	cd compose/keycloak && docker-compose up -d
