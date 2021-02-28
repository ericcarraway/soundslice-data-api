// examples/get-recording-upload-url-by-recording-id.js

const { apiClient, handleError, handleSuccess } = require(`./index.js`);

// This should be the `id` of a recording associated with a slice.
//
// You can get a recording ID by calling either
// - `createRecording`
// - `getSliceRecordingsByScorehash` returns an array of recordings.
//        You're likely interested in the one with a `status` of 'waiting'.
// - `getSliceRecordingsBySlug` (deprecated)
const recordingId = 556383;

apiClient
  .getRecordingUploadUrlByRecordingId(recordingId)
  .then(handleSuccess)
  .catch(handleError);

// logs an object with a `url` you can PUT to
