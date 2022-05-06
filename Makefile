install:
	npm ci

lint:
	@npx eslint .

test:
	@npm test -s

test-coverage:
	@npm test -s -- --coverage --coverageProvider=v8
