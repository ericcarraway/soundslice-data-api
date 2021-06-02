set -e

mkdir -p dist

npx tsc --project .

npm run prettier
