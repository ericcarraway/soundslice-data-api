// examples/get-slice-notation-by-scorehash.js

// https://www.soundslice.com/help/data-api/#getnotation

const { apiClient, handleError, handleSuccess } = require(`./index.js`);

// change this to the scorehash of a slice you own
const scorehash = `b8vDc`;

// returns an object with a single key: `url`
// this URL is a link to the original uploaded notation file
apiClient
  .getSliceNotationByScorehash(scorehash)
  .then(handleSuccess)
  .catch(handleError);
