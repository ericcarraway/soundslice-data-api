const axios = require(`axios`);

const btoa = (b) => Buffer.from(b).toString(`base64`);

module.exports = ({ SOUNDSLICE_APPLICATION_ID, SOUNDSLICE_PASSWORD }) => {
  const SOUNDSLICE_API_KEY = btoa(
    `${SOUNDSLICE_APPLICATION_ID}:${SOUNDSLICE_PASSWORD}`,
  );

  const axiosOpts = {
    baseURL: `https://www.soundslice.com/api/v1/`,
    headers: {
      Authorization: `Basic ${SOUNDSLICE_API_KEY}`,
    },
  };

  const axiosInstance = axios.create(axiosOpts);

  const listSlices = () => axiosInstance.get(`/scores/`);

  return {
    listSlices,
  };
};
