build:
	node build.js

run:
	@echo "Running on http://localhost:8001"
	cd docs && python3 -m http.server 8001
	