const { apiClient, handleError, handleSuccess } = require(`./index.js`);

apiClient
  .moveSliceToFolder({
    slug: `347252`, // required
    folder_id: `2428`, // required

    // user_id: ``, // optional
  })
  .then(handleSuccess)
  .catch(handleError);
