// examples/get-slice-by-scorehash.js

const { apiClient, handleError, handleSuccess } = require(`./index.js`);

// change this to the scorehash of a slice you own
const scorehash = `2zcDc`;

apiClient.getSliceByScorehash(scorehash).then(handleSuccess).catch(handleError);
