const { apiClient } = require(`./index.js`);

const main = async () => {
  const params = {
    // Required - The folder's ID.
    folderId: `12345`,

    // Required - The new name of the folder.
    name: `This folder has been renamed`,
  };

  let res;

  try {
    res = await apiClient.renameFolder(params);
  } catch (err) {
    console.error(`ERROR:`);

    const { data, status, statusText } = err.response;

    console.log({
      status,
      statusText,
    });

    console.log(data);

    return;
  }

  console.log(res.data);

  console.log(`https://www.soundslice.com/manage/folder-${res.data.id}/`);
};

main();
