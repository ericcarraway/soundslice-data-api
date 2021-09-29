// examples/get-notation-upload-url-by-scorehash.js

// https://www.soundslice.com/help/data-api/#putnotation

const { apiClient } = require(`./index.js`);

// This should be the `scorehash` of a slice you own.
const scorehash = `b8vDc`;

const main = async () => {
  let res;

  try {
    // initiate an upload via a POST request
    // receive a temporary URL to PUT the notation file to
    res = await apiClient.getNotationUploadUrlByScorehash(scorehash);
  } catch (err) {
    console.error(`ERROR:`);

    if (typeof err.response !== `object`) {
      console.log(err);

      return;
    }

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
