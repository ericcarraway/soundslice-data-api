// examples/get-syncpoints-by-recording-id.js

const { apiClient, handleError, handleSuccess } = require(`./index.js`);

const recordingId = `611136`;

apiClient
  .getSyncpointsByRecordingId(recordingId)
  .then(handleSuccess)
  .catch(handleError);
