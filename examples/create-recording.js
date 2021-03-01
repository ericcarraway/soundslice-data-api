// examples/create-recording.js

// https://www.soundslice.com/help/data-api/#createrecording

const { apiClient } = require(`./index.js`);

const main = async () => {
  const paramsObj = {
    // required, because it forms the POST url
    slug: 565773,

    // an integer, required
    source: 4,

    // optional
    // name: ``,

    // sometimes optional
    // source_data: ``,

    // sometimes optional
    // hls_url: ``,
  };

  let res;

  try {
    res = await apiClient.createRecording(paramsObj);
  } catch (err) {
    console.error(`ERROR:`);

    const { data, status, statusText } = err.response;

    console.log({
      status,
      statusText,
    });

    console.log(data);

    return;
  }

  // `data.id` is the `recordingId`
  //
  // If you need to upload a recording,
  // because your `source` integer was one of
  //   2 — MP3 uploaded to Soundslice
  //   4 — Video uploaded to Soundslice
  // this is what you should pass to
  // `apiClient.getRecordingUploadUrlByRecordingId`.
  console.log(res.data);
};

main();
