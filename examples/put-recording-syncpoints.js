// examples/put-recording-syncpoints.js

const { apiClient, handleError, handleSuccess } = require(`./index.js`);

const paramsObj = {
  // Required
  recordingId: `494055`,

  // Required - an array of syncpoint arrays
  //   each entry is an array with the following numbers:
  //   index 0 - bar (required)
  //   index 1 - time (required)
  //   index 2 - percentage into the bar (optional)
  //             between 0 & 480 (50% is 240)
  syncpoints: [
    [0, 0],
    [1, 0.57],
    [1, 0.8, 240],
    [2, 1.3],
  ],

  // Optional - floating-point number
  // crop_start: 59.0,

  // Optional - floating-point number
  // crop_end: 65.0,
};

const main = async () => {
  try {
    const res = await apiClient.putRecordingSyncpoints(paramsObj);

    handleSuccess(res);
  } catch (err) {
    console.error(`ERROR:`);

    handleError(err);
  }
};

main();
