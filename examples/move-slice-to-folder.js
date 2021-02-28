// examples/move-slice-to-folder.js

// https://www.soundslice.com/help/data-api/#moveslice

const { apiClient, handleError, handleSuccess } = require(`./index.js`);

apiClient
  .moveSliceToFolder({
    folder_id: `2428`, // required
    slug: `347252`, // required

    // user_id: ``, // optional
  })
  .then(handleSuccess)
  .catch(handleError);
