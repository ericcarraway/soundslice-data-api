// examples/list-subfolders-by-parent-id

const { apiClient, handleError } = require(`./index.js`);

const parentId = `18494`;

apiClient
  .listSubfoldersByParentId(parentId)
  .then(handleSuccess)
  .catch(handleError);

function handleSuccess(res) {
  const arrayOfFolders = res.data;

  // the number of subfolders under the folder with this `parentId`
  console.log(
    `arrayOfFolders.length`,
    arrayOfFolders.length.toLocaleString(),
    `\n`,
  );

  arrayOfFolders.forEach((folder) => console.log(folder));
}
