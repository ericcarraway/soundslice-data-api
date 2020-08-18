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

  const { get } = axiosInstance;

  // https://www.soundslice.com/help/data-api/

  const getSliceBySlug = (slug) => get(`/scores/${slug}/`);
  const getSliceNotationBySlug = (slug) => get(`/scores/${slug}/notation/`);
  const getSliceRecordingsBySlug = (slug) => get(`/scores/${slug}/recordings/`);
  const getSyncpointsByRecordingId = (recordingId) => get(`/recordings/${recordingId}/syncpoints/`);
  const listFolders = () => get(`/folders/`);
  const listSlices = () => get(`/scores/`);
  const listSubfoldersByParentId = (parentId) => get(`/folders/?parent_id=${parentId}`);

  return {
    getSliceBySlug,
    getSliceNotationBySlug,
    getSliceRecordingsBySlug,
    getSyncpointsByRecordingId,
    listFolders,
    listSlices,
    listSubfoldersByParentId,
  };
};
