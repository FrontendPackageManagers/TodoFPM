build: fpm-install
	npm run component build

fpm-install:
	npm install



mostlyclean:
	rm -fr build components

clean-fpm: 
	rm -rf node_modules

clean: mostlyclean clean-fpm

.PHONY: build fpm-install mostlyclean clean-fpm clean
