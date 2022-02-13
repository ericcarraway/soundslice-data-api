// examples/upload-video.js
const path = require(`path`);

const { apiClient } = require(`./index.js`);

async function uploadVideo({ name, pathToFile, scorehash }) {
  let uploadUrl = ``;

  const params = {
    scorehash,
    source: 4,
  };

  if (name) {
    params.name = name;
  }

  const res1 = await apiClient.createRecording(params);

  let recordingId = ``;

  if (
    res1 &&
    typeof res1 === `object` &&
    res1.data &&
    typeof res1.data === `object` &&
    res1.data.id
  ) {
    recordingId = res1.data.id;
  }

  if (!recordingId) {
    throw new Error(
      `ERROR: The method \`uploadVideo\` failed to get an \`recordingId\` for the \`scorehash\` of "${scorehash}".`,
    );
  }

  const res2 = await apiClient.getRecordingUploadUrlByRecordingId(recordingId);

  if (
    res2 &&
    typeof res2 === `object` &&
    res2.data &&
    typeof res2.data === `object` &&
    res2.data.url &&
    typeof res2.data.url === `string`
  ) {
    uploadUrl = res2.data.url;
  }

  if (!uploadUrl) {
    throw new Error(
      `ERROR: The method \`uploadVideo\` failed to get an \`uploadUrl\` for the \`scorehash\` of "${scorehash}".`,
    );
  }

  const res3 = await apiClient.uploadFile({ pathToFile, uploadUrl });

  return res3;
}

// https://www.soundslice.com/slices/K6WMc/
const scorehash = `K6WMc`;
const pathToFile = path.join(__dirname, `./upload.mp4`);
const name = `Example`;

async function main() {
  try {
    const response = await uploadVideo({ name, pathToFile, scorehash });

    const { data, status, statusText } = response;

    // { data: '', status: 200, statusText: 'OK' }
    console.log({ data, status, statusText });
  } catch (err) {
    console.log(err, `ERROR:`);
  }
}

main();
