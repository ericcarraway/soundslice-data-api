set -e

# ./node_modules/eslint/bin/eslint.js ./src/*.ts --fix
# ./node_modules/eslint/bin/eslint.js ./src/**/*.ts --fix

# ./node_modules/eslint/bin/eslint.js ./dist/*.js --fix
# ./node_modules/eslint/bin/eslint.js ./dist/**/*.js --fix

./node_modules/eslint/bin/eslint.js ./examples/*.js --fix

./node_modules/eslint/bin/eslint.js ./tests/*.js --fix

npm run prettier
