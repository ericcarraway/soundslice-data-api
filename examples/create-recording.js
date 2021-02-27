// examples/create-recording.js

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
    // source_data

    // sometimes optional
    // hls_url
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

  console.log(res.data);
};

main();
