composeDev = docker-compose.dev.yml

run-dev:
	docker compose -f $(composeDev) --env-file=.env.dev up --build

stop-dev:
	docker compose -f $(composeDev) down

restart-dev: stop-dev run-dev
