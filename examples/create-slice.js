const { apiClient } = require(`./index.js`);

const main = async () => {
  const params = {
    name: `Fibonacci Konnakol`,
    artist: `B C Manjunath`,
    folder_id: `2428`,
    embed_status: 4,
    print_status: 3,
    status: 3,
  };

  let res;

  try {
    res = await apiClient.createSlice(params);
  } catch (err) {
    console.error(`ERROR:`);

    const {
      data,
      status,
      statusText,
    } = err.response;

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
    // scorehash,
    // slug,
    url,
    // embedUrl,
  } = res.data;

  console.log(`https://www.soundslice.com${url}`);
};

main();
