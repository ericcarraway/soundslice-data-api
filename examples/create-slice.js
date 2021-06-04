// examples/create-slice.js

// https://www.soundslice.com/help/data-api/#createslice

const { apiClient } = require(`./index.js`);

const main = async () => {
  const paramsObj = {
    artist: `B C Manjunath`,
    embed_status: 4,
    folder_id: `15303`,
    name: `Fibonacci Konnakol`,
    print_status: 3,
    status: 3,
  };

  let res;

  try {
    res = await apiClient.createSlice(paramsObj);
  } catch (err) {
    console.error(`ERROR:`);

    const { data, status, statusText } = err.response;

    // { status: 422, statusText: 'Unprocessable Entity' }
    console.log({
      status,
      statusText,
    });

    // { folder_id: [ 'This folder ID is invalid.' ] }
    console.log(data.errors);

    return;
  }

  const {
    scorehash,
    slug,
    url,
    // embed_url,
  } = res.data;

  // { scorehash: '2zcDc', slug: '565773' }
  console.log({ scorehash, slug });

  console.log(`https://www.soundslice.com${url}`);
};

main();
