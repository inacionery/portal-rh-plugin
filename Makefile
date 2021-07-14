
build:
	@rm -rf dist; \
	mkdir -p dist; \
	pushd ./src > /dev/null; \
	zip -rq ../dist/portal-rh-plugin ./*; \
	popd > /dev/null; \
	echo "Done"