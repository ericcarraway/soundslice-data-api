// https://www.soundslice.com/help/data-api/

const axios = require(`axios`);
const FormData = require(`form-data`);

const btoa = (b) => Buffer.from(b).toString(`base64`);

const getFormDataFromObj = (paramsObj) => {
  const formData = new FormData();

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(paramsObj)) {
    formData.append(key, value);
  }

  return formData;
};

module.exports = ({ SOUNDSLICE_APPLICATION_ID, SOUNDSLICE_PASSWORD }) => {
  const baseURL = `https://www.soundslice.com/api/v1`;

  const SOUNDSLICE_API_KEY = btoa(
    `${SOUNDSLICE_APPLICATION_ID}:${SOUNDSLICE_PASSWORD}`,
  );

  const headers = {
    Authorization: `Basic ${SOUNDSLICE_API_KEY}`,
  };

  const createSlice = (paramsObj) => {
    const formData = getFormDataFromObj(paramsObj);

    const config = {
      headers: {
        Authorization: headers.Authorization,
        ...formData.getHeaders(),
      },
    };

    return axios.post(`${baseURL}/scores/`, formData, config);
  };

  const moveSliceToFolder = (paramsObj) => {
    const { slug } = paramsObj;
    const paramsObjClone = { ...paramsObj };

    delete paramsObjClone.slug;

    // required: folder_id
    // optional: user_id
    const formData = getFormDataFromObj(paramsObjClone);

    const config = {
      headers: {
        Authorization: headers.Authorization,
        ...formData.getHeaders(),
      },
    };

    return axios.post(`${baseURL}/scores/${slug}/move/`, formData, config);
  };

  const axiosInstance = axios.create({ baseURL, headers });

  const deleteSliceBySlug = (slug) => axiosInstance.delete(`/scores/${slug}/`);

  const { get } = axiosInstance;

  const getSliceBySlug = (slug) => get(`/scores/${slug}/`);
  const getSliceNotationBySlug = (slug) => get(`/scores/${slug}/notation/`);
  const getSliceRecordingsBySlug = (slug) => get(`/scores/${slug}/recordings/`);
  const getSyncpointsByRecordingId = (recordingId) =>
    get(`/recordings/${recordingId}/syncpoints/`);
  const listFolders = () => get(`/folders/`);
  const listSlices = () => get(`/scores/`);
  const listSubfoldersByParentId = (parentId) =>
    get(`/folders/?parent_id=${parentId}`);

  return {
    createSlice,
    deleteSliceBySlug,
    getSliceBySlug,
    getSliceNotationBySlug,
    getSliceRecordingsBySlug,
    getSyncpointsByRecordingId,
    listFolders,
    listSlices,
    listSubfoldersByParentId,
    moveSliceToFolder,
  };
};
