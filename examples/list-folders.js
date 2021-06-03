// examples/list-folders.js

// https://www.soundslice.com/help/data-api/#listfolders

const { apiClient, handleError } = require(`./index.js`);

// lists all folders within your account's slice manager
apiClient.listFolders().then(handleSuccess).catch(handleError);

function handleSuccess(res) {
  const arrayOfFolders = res.data;

  console.log(
    `arrayOfFolders.length`,
    arrayOfFolders.length.toLocaleString(),
    `\n`,
  );

  arrayOfFolders.forEach((folder) => console.log(folder));
}
