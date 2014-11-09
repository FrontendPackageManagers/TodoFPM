build: fpm-install
	npm install
	mkdir -p build/css build/views
	cp -rf lib/css/* build/css
	cp -rf lib/views/* build/views
	cd fpm && browserify ../lib/js/app.js > ../build/app.js

fpm-install:
	cd fpm && npm install



mostlyclean:
	rm -fr build components

clean-fpm: 
	rm -rf fpm/node_modules

clean: mostlyclean clean-fpm

.PHONY: build fpm-install mostlyclean clean-fpm clean
