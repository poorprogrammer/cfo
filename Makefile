.PHONY: dev dev-api dev-web install e2e e2e-ci test-web e2e-cucumber keycloak

# Default target
dev: dev-api dev-web

# Install dependencies for both services
install:
	cd api && bun install
	cd web && bun install

# Start API in development mode (in background)
dev-api: install
	cd api && ./scripts/start_api_with_test_fixture &

# Start web in development mode
dev-web: install keycloak
	cd web && bun run serve

# Stop all development servers
stop:
	pkill -f 'node.*api'
	pkill -f 'vue-cli-service serve'

# Clean install and start development
fresh: stop install dev

e2e:
	cd e2e && DEV=true npx playwright test

e2e-cucumber:
	cd e2e && DEV=true npm run test:cucumber 

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
