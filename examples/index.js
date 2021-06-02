// load environment variables
// eslint-disable-next-line @typescript-eslint/no-var-requires
require(`dotenv`).config({ path: `../.env` });

const { SOUNDSLICE_APPLICATION_ID, SOUNDSLICE_PASSWORD } = process.env;

// instantiate the client
// eslint-disable-next-line @typescript-eslint/no-var-requires
const apiClient = require(`../dist/index.js`)({
  SOUNDSLICE_APPLICATION_ID,
  SOUNDSLICE_PASSWORD,
});

const handleError = (err) => {
  const { data, status, statusText } = err.response;

  // { status: 422, statusText: 'Unprocessable Entity' }
  console.log({
    status,
    statusText,
  });

  // { error: 'Please provide a name.' }
  // { error: 'The parent_id was invalid or not owned by your account.' }
  console.log(data);
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
