// examples/delete-slice-by-slug.js

// https://www.soundslice.com/help/data-api/#deleteslice

const { apiClient } = require(`./index.js`);

// change this to the slug of a slice you own & wish to delete
const slug = `456420`;

const main = async () => {
  try {
    const res = await apiClient.deleteSliceBySlug(slug);

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
