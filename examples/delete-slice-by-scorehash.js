// examples/delete-slice-by-scorehash.js

// https://www.soundslice.com/help/data-api/#deleteslice

const { apiClient } = require(`./index.js`);

// change this to the scorehash of a slice you own & wish to delete
const scorehash = `GHdDc`;

const main = async () => {
  try {
    const res = await apiClient.deleteSliceByScorehash(scorehash);

    // { name: 'Fibonacci Konnakol', artist: 'B C Manjunath' }
    console.log(res.data);
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
