# build the todo app
build: fpm-install
	npm run duo lib/boot/index.{js,css}

# install component
fpm-install:
	npm install

# build todo app in dev environment for tests
test:
	npm run component build --dev

# clean FPM output (intall & build)
mostlyclean:
	rm -fr build components

# remove the FTP
clean-fpm: 
	rm -rf node_modules

# clean all
clean: mostlyclean clean-fpm

.PHONY: build fpm-install test mostlyclean clean-fpm clean
