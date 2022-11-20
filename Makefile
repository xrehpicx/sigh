.PHONY: build-dev
build-dev:
	docker compose -f docker/development/docker-compose.yml build

.PHONY: start-dev
start-dev:
	docker compose -f docker/development/docker-compose.yml up

.PHONY: stop-dev
stop-dev:
	docker compose -f docker/development/docker-compose.yml down

.PHONY: build-production
build-production:
	docker compose -f docker/production/docker-compose.yml build

.PHONY: start-production
start-production:
	docker compose -f docker/production/docker-compose.yml up -d

.PHONY: stop-production
stop-production:
	docker compose -f docker/production/docker-compose.yml down