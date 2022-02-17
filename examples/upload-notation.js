// examples/upload-notation.js
const path = require(`path`);

const { apiClient } = require(`./index.js`);

// https://www.soundslice.com/slices/K6WMc/
const scorehash = `K6WMc`;
const pathToFile = path.join(__dirname, `./upload.musicxml`);

async function main() {
  try {
    const response = await apiClient.uploadNotation({ pathToFile, scorehash });

    const { data, status, statusText } = response;

    // { data: '', status: 200, statusText: 'OK' }
    console.log({ data, status, statusText });
  } catch (err) {
    console.log(err, `ERROR:`);
  }
}

main();
