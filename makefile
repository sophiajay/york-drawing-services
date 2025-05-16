build:
	node build.js

run:
	@echo "Running on http://localhost:8001"
	cd site && python3 -m http.server 8001
	