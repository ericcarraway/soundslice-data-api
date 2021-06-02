// examples/upload-file.js

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require(`path`);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { apiClient } = require(`./index.js`);

async function main() {
  // change this to the path of a file on your filesystem
  const pathToFile = path.join(__dirname, `./video.mp4`);

  // change this to the URL returned by a request to `getRecordingUploadUrlByRecordingId`
  const uploadUrl = `https://soundslice-audio.s3.amazonaws.com/uploads/...`;

  let response;

  try {
    response = await apiClient.uploadFile({
      pathToFile,
      uploadUrl,
    });
  } catch (err) {
    console.error(err);

    console.log(`ERROR:`);

    return;
  }

  const { status, statusText } = response || {};

  // { status: 200, statusText: 'OK' }
  console.log({ status, statusText });
}

main();
