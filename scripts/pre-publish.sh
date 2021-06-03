set -e

npm run lint
npm run build
npm run test

echo "DONE: pre-publish.sh"
