.PHONY: generate publish

generate:
	./scripts/generate.sh $(VERSION)

publish:
	./scripts/publish.sh $(VERSION)
