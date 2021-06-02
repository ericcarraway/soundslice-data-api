// examples/duplicate-slice-by-scorehash.js

// https://www.soundslice.com/help/data-api/#duplicateslice

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { apiClient } = require(`./index.js`);

const scorehash = `5Kzcc`;

const main = async () => {
  try {
    const res = await apiClient.duplicateSliceByScorehash(scorehash);

    // { scorehash: 'abcde', slug: '123456', url: '/slices/abcde/' }
    console.log(res.data);
  } catch (err) {
    console.error(`ERROR:`);

    const { data, status, statusText } = err.response;

    // { status: 422, statusText: 'Unprocessable Entity' }
    console.log({
      status,
      statusText,
    });

    // { error: 'Your account may not set the slug.' }
    console.log(data);
  }
};

main();
