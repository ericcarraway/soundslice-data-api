const EXPECTED_BASE_AXIOS_CONFIG = {
  baseURL: `https://www.soundslice.com/api/v1`,

  // this is not a real auth token
  // this is the Base64 encoding of "Aladdin:open sesame"
  headers: { Authorization: `Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==` },
};

// these are not real credentials
const SOUNDSLICE_APPLICATION_ID = `Aladdin`;
const SOUNDSLICE_PASSWORD = `open sesame`;

module.exports = {
  EXPECTED_BASE_AXIOS_CONFIG,
  SOUNDSLICE_APPLICATION_ID,
  SOUNDSLICE_PASSWORD,
};
