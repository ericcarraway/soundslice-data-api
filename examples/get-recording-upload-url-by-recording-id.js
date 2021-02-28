// examples/get-recording-upload-url-by-recording-id.js

const { apiClient } = require(`./index.js`);

// This should be the `id` of a recording associated with a slice.
//
// You can get a recording ID by calling either
// - `createRecording`
// - `getSliceRecordingsByScorehash` returns an array of recordings.
//        You're likely interested in the one with a `status` of 'waiting'.
// - `getSliceRecordingsBySlug` (deprecated)
const recordingId = 556383;

const main = async () => {
  let res;

  try {
    res = await apiClient.getRecordingUploadUrlByRecordingId(recordingId);
  } catch (err) {
    console.error(`ERROR:`);

    const { status, statusText } = err.response;

    // { status: 403, statusText: 'Forbidden' }
    console.error({ status, statusText });

    return;
  }

  // this is the URL we'll PUT to with `apiClient.uploadFile`
  const uploadUrl = res.data.url;

  console.log(uploadUrl);
};

main();
