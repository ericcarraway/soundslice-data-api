// examples/delete-recording-by-recording-id.js

// https://www.soundslice.com/help/data-api/#deleterecording

const { apiClient } = require(`./index.js`);

// change this to the ID of a recording you own & wish to delete
// https://www.soundslice.com/help/data-api/#deleterecording
const recordingId = `556383`;

const main = async () => {
  try {
    const res = await apiClient.deleteRecordingByRecordingId(recordingId);

    const { data, status } = res;

    // { status: 200 }
    console.log({ status });

    // { name: 'Video' }
    console.log(data);
  } catch (err) {
    console.error(`ERROR:`);

    const { status, statusText } = err.response;

    // { status: 403, statusText: 'Forbidden' }
    console.log({
      status,
      statusText,
    });
  }
};

main();
