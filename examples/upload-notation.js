// examples/upload-notation.js
const path = require(`path`);

const { apiClient } = require(`./index.js`);

async function uploadNotation({ pathToFile, scorehash }) {
  let uploadUrl = ``;

  const res1 = await apiClient.getNotationUploadUrlByScorehash(scorehash);

  if (
    res1 &&
    typeof res1 === `object` &&
    res1.data &&
    typeof res1.data === `object` &&
    res1.data.url &&
    typeof res1.data.url === `string`
  ) {
    uploadUrl = res1.data.url;
  }

  if (!uploadUrl) {
    throw new Error(
      `ERROR: The method \`uploadNotation\` failed to get an \`uploadUrl\` for the \`scorehash\` of "${scorehash}".`,
    );
  }

  const res2 = await apiClient.uploadFile({ pathToFile, uploadUrl });

  return res2;
}

// https://www.soundslice.com/slices/K6WMc/
const scorehash = `K6WMc`;
const pathToFile = path.join(__dirname, `./upload.musicxml`);

async function main() {
  try {
    const response = await uploadNotation({ pathToFile, scorehash });

    const { data, status, statusText } = response;

    // { data: '', status: 200, statusText: 'OK' }
    console.log({ data, status, statusText });
  } catch (err) {
    console.log(err, `ERROR:`);
  }
}

main();
