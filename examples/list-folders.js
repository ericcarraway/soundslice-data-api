// examples/list-folders.js

const { apiClient, handleError, handleSuccess } = require(`./index.js`);

// lists all folders within your account's slice manager
apiClient.listFolders().then(handleSuccess).catch(handleError);
