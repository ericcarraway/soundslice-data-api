const { apiClient, handleError, handleSuccess } = require(`./index.js`);

apiClient.listSlices().then(handleSuccess).catch(handleError);
