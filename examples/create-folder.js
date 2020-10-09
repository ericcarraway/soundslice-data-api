const { apiClient } = require(`./index.js`);

const main = async () => {
  const params = {
    // Required - The name of the folder.
    name: `New Example Folder`,

    // Optional - Integer. The folder's parent ID.
    // Use this if you want to nest a folder within another one.
    parent_id: 12345,
  };

  let res;

  try {
    res = await apiClient.createFolder(params);
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

  console.log(res.data);

  console.log(`https://www.soundslice.com/manage/folder-${res.data.id}/`);
};

main();
