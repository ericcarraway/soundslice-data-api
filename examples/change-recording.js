// examples/change-recording.js

// https://www.soundslice.com/help/data-api/#changerecording

const { apiClient, handleError, handleSuccess } = require(`./index.js`);

const paramsObj = {
  // the attribute of the recording that we'd like to change
  name: `Changed Recording Name`,

  // optionally, 'source_data' can be changed if `source` is 3 or 8

  // optionally ,'hls_url' can be changed if `source` is 3

  // required
  recordingId: 123456,
};

apiClient.changeRecording(paramsObj).then(handleSuccess).catch(handleError);
