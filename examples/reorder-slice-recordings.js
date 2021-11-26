// examples/reorder-slice-recordings.js

// https://www.soundslice.com/help/data-api/#reorderrecordings

const { apiClient, handleError, handleSuccess } = require(`./index.js`);

const paramsObj = {
  order: [222226, 222227, 222225],
  scorehash: `abcde`,
};

apiClient
  .reorderSliceRecordings(paramsObj)
  .then(handleSuccess)
  .catch(handleError);
