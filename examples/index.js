const path = require(`path`);

// load environment variables
require(`dotenv`).config({
  path: path.resolve(__dirname, `../.env`),
});

const { SOUNDSLICE_APPLICATION_ID, SOUNDSLICE_PASSWORD } = process.env;

if (!SOUNDSLICE_APPLICATION_ID) {
  console.error(
    `@percuss.io/soundslice-data-api ERROR: configure SOUNDSLICE_APPLICATION_ID`,
  );

  process.exit(1);
}

if (!SOUNDSLICE_PASSWORD) {
  console.error(
    `@percuss.io/soundslice-data-api ERROR: configure SOUNDSLICE_PASSWORD`,
  );

  process.exit(1);
}

// instantiate the client
const apiClient = require(`../dist/index.js`).default({
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
