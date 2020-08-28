require(`dotenv`).config();

const { SOUNDSLICE_APPLICATION_ID, SOUNDSLICE_PASSWORD } = process.env;

const apiClient = require(`../index.js`)({
  SOUNDSLICE_APPLICATION_ID,
  SOUNDSLICE_PASSWORD,
});

module.exports = { apiClient };
