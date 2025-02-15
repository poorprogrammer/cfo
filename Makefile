.PHONY: dev dev-api dev-web install e2e e2e-ci

# Default target
dev: dev-api dev-web

# Install dependencies for both services
install:
	cd api && bun install
	cd web && bun install

# Start API in development mode (in background)
dev-api:
	cd api && bun run serve &

# Start web in development mode
dev-web:
	cd web && bun run serve

# Stop all development servers
stop:
	pkill -f 'node.*api'
	pkill -f 'vue-cli-service serve'

# Clean install and start development
fresh: stop install dev

e2e:
	cd e2e && DEV=true npx playwright test

# Run end-to-end tests in CI environment
e2e-ci:
	docker-compose -f compose/test/docker-compose.yml build e2e
	docker-compose -f compose/test/docker-compose.yml run --rm e2e
