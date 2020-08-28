// load environment variables
require(`dotenv`).config({ path: `../.env` });

const { SOUNDSLICE_APPLICATION_ID, SOUNDSLICE_PASSWORD } = process.env;

const apiClient = require(`../index.js`)({
  SOUNDSLICE_APPLICATION_ID,
  SOUNDSLICE_PASSWORD,
});

const handleError = (err) => {
  const { response } = err;

  console.error(response.status);
  console.error(response.statusText);
};

const handleSuccess = (res) => {
  const { data } = res;

  console.log(data);
};

module.exports = {
  apiClient,
  handleError,
  handleSuccess,
};
