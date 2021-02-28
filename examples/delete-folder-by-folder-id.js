// examples/delete-folder-by-folder-id.js

// deleteFolderByFolderId(folderId)

// https://www.soundslice.com/help/data-api/#deletefolder

const { apiClient } = require(`./index.js`);

// change this to the ID of a recording you own & wish to delete
// https://www.soundslice.com/help/data-api/#deletefolder
const folderId = `28882`;

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

    const { data, status, statusText } = err.response;

    // If you don't own the folder, you'll see this error:
    // { status: 403, statusText: 'Forbidden' }

    // If the folder is not empty, you'll see this error:
    // { status: 422, statusText: 'Unprocessable Entity' }
    console.log({
      status,
      statusText,
    });

    // { error: 'Folder contains slices.' }
    console.log(data);
  }
};

main();
