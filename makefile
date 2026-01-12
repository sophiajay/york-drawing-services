all: build
	sleep 2 && open http://localhost:8001 &
	$(MAKE) -j 2 build-watch run

build:
	node build.js

build-watch: install
	onchange 'templates/**' -- node build.js

run:
	@echo "Running on http://localhost:8001"
	cd docs && python3 -m http.server 8001

install:
	command -v onchange >/dev/null 2>&1 || npm install -g onchange
	