// https://www.soundslice.com/help/data-api/

const axios = require(`axios`);
const FormData = require(`form-data`);

const btoa = (b) => Buffer.from(b).toString(`base64`);

module.exports = ({ SOUNDSLICE_APPLICATION_ID, SOUNDSLICE_PASSWORD }) => {
  const baseURL = `https://www.soundslice.com/api/v1`;

  const SOUNDSLICE_API_KEY = btoa(
    `${SOUNDSLICE_APPLICATION_ID}:${SOUNDSLICE_PASSWORD}`,
  );

  const headers = {
    Authorization: `Basic ${SOUNDSLICE_API_KEY}`,
  };

  const { get } = axios.create({ baseURL, headers });

  const createSlice = (paramsObj) => {
    const form = new FormData();

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(paramsObj)) {
      form.append(key, value);
    }

    const config = {
      headers: {
        Authorization: headers.Authorization,
        ...form.getHeaders(),
      },
    };

    return axios.post(`${baseURL}/scores/`, form, config);
  };

  const getSliceBySlug = (slug) => get(`/scores/${slug}/`);
  const getSliceNotationBySlug = (slug) => get(`/scores/${slug}/notation/`);
  const getSliceRecordingsBySlug = (slug) => get(`/scores/${slug}/recordings/`);
  const getSyncpointsByRecordingId = (recordingId) => get(`/recordings/${recordingId}/syncpoints/`);
  const listFolders = () => get(`/folders/`);
  const listSlices = () => get(`/scores/`);
  const listSubfoldersByParentId = (parentId) => get(`/folders/?parent_id=${parentId}`);

  return {
    createSlice,
    getSliceBySlug,
    getSliceNotationBySlug,
    getSliceRecordingsBySlug,
    getSyncpointsByRecordingId,
    listFolders,
    listSlices,
    listSubfoldersByParentId,
  };
};
