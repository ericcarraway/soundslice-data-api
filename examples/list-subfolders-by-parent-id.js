// examples/list-subfolders-by-parent-id

const { apiClient, handleError, handleSuccess } = require(`./index.js`);

const parentId = `15303`;

apiClient
  .listSubfoldersByParentId(parentId)
  .then(handleSuccess)
  .catch(handleError);
