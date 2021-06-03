// examples/list-slices.js

// https://www.soundslice.com/help/data-api/#listslices

const { apiClient, handleError } = require(`./index.js`);

// retrieves metadata for all slices in your account
apiClient.listSlices().then(handleSuccess).catch(handleError);

function handleSuccess(res) {
  const arrayOfSlices = res.data;

  console.log(
    `arrayOfSlices.length`,
    arrayOfSlices.length.toLocaleString(),
    `\n`,
  );

  arrayOfSlices.forEach((slice) => console.log(slice));
}

// returns an array of slices, each with the following shape:
//
// {
//   slug: '148849',
//   scorehash: '8Vfcc',
//   name: 'Will Be',
//   artist: 'Amanda Muse',
//   status: 1,
//   embed_status: 4,
//   can_print: true,
//   print_status: 3,
//   has_notation: true,
//   show_notation: true,
//   recording_count: 1
// },
