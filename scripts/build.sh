set -e

# for debugging, log our `node` & `npm` versions
echo "node -v '`node -v`'"
echo "npm -v '`npm -v`'"

mkdir -p dist

npx tsc --project .

npm run prettier
