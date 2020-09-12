const { apiClient } = require(`./index.js`);

const scorehash = `5Kzcc`;

const main = async () => {
  try {
    const res = await apiClient.duplicateSliceByScorehash(scorehash);

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
