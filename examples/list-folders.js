// examples/list-folders.js

// https://www.soundslice.com/help/data-api/#listfolders

const { apiClient, handleError, handleSuccess } = require(`./index.js`);

// lists all folders within your account's slice manager
apiClient.listFolders().then(handleSuccess).catch(handleError);
