# start express to avoid cross domain errors due to routing features
express: 
	cd server && npm install
	cd server && node serve

# TODO: trigger examples
# 1. install the fpm
# 2. install dependencies
# 3. bundle for the browser
# 4. start tests
# 5. evaulate tests
# 6. publish build and test results


.PHONY: express
