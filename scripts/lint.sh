./node_modules/eslint/bin/eslint.js ./*.js --fix
                           prettier ./*.js --no-config --single-quote --trailing-comma all --write

./node_modules/eslint/bin/eslint.js ./**/*.js --fix
                           prettier ./**/*.js --no-config --single-quote --trailing-comma all --write
