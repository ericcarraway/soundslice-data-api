// examples/create-folder.js

// https://www.soundslice.com/help/data-api/#createfolder

const { apiClient } = require(`./index.js`);

const main = async () => {
  const paramsObj = {
    // Required - The name of the folder.
    name: `New Example Folder ${new Date().toLocaleTimeString()}`,

    // Optional - Integer. The folder's parent ID.
    // Use this if you want to nest a folder within another one.
    parent_id: 15303,
  };

  let res;

  try {
    res = await apiClient.createFolder(paramsObj);
  } catch (err) {
    console.error(`ERROR:`);

    const { data, status, statusText } = err.response;

    // { status: 422, statusText: 'Unprocessable Entity' }
    console.log({
      status,
      statusText,
    });

    // { error: 'Please provide a name.' }
    // or
    // { error: 'The parent_id was invalid or not owned by your account.' }
    console.log(data);

    return;
  }

  // { id: 28882 }
  console.log(res.data);

  console.log(`https://www.soundslice.com/manage/folder-${res.data.id}/`);
};

main();
