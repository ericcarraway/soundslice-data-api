// deleteFolderByFolderId(folderId)

const { apiClient } = require(`./index.js`);

// change this to the ID of a recording you own & wish to delete
// https://www.soundslice.com/help/data-api/#deletefolder
const folderId = `21086`;

const main = async () => {
  try {
    const res = await apiClient.deleteFolderByFolderId(folderId);

    const { data, status } = res;

    // 200
    console.log(status);

    // The ID of the deleted folder’s parent folder,
    // or `null` if the deleted folder was in the root.
    // { parent_id: 12345 }
    console.log(data);
  } catch (err) {
    console.error(`ERROR:`);

    const { status, statusText } = err.response;

    // { status: 403, statusText: 'Forbidden' }
    console.log({
      status,
      statusText,
    });
  }
};

main();
