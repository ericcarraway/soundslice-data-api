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

  const post = (url, paramsObj) => {
    const formData = getFormDataFromObj(paramsObj);

    const config = {
      headers: {
        Authorization: headers.Authorization,
        ...formData.getHeaders(),
      },
    };

    return axios.post(url, formData, config);
  };

  const createFolder = (paramsObj) => post(`${baseURL}/folders/`, paramsObj);
  const createSlice = (paramsObj) => post(`${baseURL}/scores/`, paramsObj);

  const moveSliceToFolder = (paramsObj) => {
    const { slug } = paramsObj;
    const paramsObjClone = { ...paramsObj };

    delete paramsObjClone.slug;

    // required: folder_id
    // optional: user_id
    return post(`${baseURL}/scores/${slug}/move/`, paramsObjClone);
  };

  const renameFolder = (paramsObj) => {
    const { folderId } = paramsObj;
    const paramsObjClone = { ...paramsObj };

    delete paramsObjClone.folderId;

    // required: name
    return post(`${baseURL}/folders/${folderId}/`, paramsObjClone);
  };

  const axiosInstance = axios.create({ baseURL, headers });

  const duplicateSliceByScorehash = (scorehash) =>
    axiosInstance.post(`/slices/${scorehash}/duplicate/`);

  /**
   * Sets the syncpoints for the recording with ID `recordingId`.
   *
   * @see https://www.soundslice.com/help/data-api/#putsyncpoints
   *
   * @param {Object} paramsObj paramsObj
   * paramsObj.syncpoints (Required) an array of syncpoint arrays
   *
   * paramsObj.crop_start (Optional) floating-point number
   * paramsObj.crop_end   (Optional) floating-point number
   *
   * @return {Promise} an Axios promise
   */
  const putRecordingSyncpoints = (paramsObj) => {
    const { recordingId, syncpoints } = paramsObj;
    const paramsObjClone = { ...paramsObj };

    delete paramsObjClone.recordingId;

    if (syncpoints) {
      paramsObjClone.syncpoints = JSON.stringify(syncpoints);
    }

    return post(
      `${baseURL}/recordings/${recordingId}/syncpoints/`,
      paramsObjClone,
    );
  };

  // all DELETE methods...
  const deleteFolderByFolderId = (folderId) =>
    axiosInstance.delete(`/folders/${folderId}/`);
  const deleteRecordingByRecordingId = (recordingId) =>
    axiosInstance.delete(`/recordings/${recordingId}/`);
  const deleteSliceBySlug = (slug) => axiosInstance.delete(`/scores/${slug}/`);

  const { get } = axiosInstance;

  // all GET methods...
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
    createFolder,
    createSlice,
    deleteFolderByFolderId,
    deleteRecordingByRecordingId,
    deleteSliceBySlug,
    duplicateSliceByScorehash,
    getSliceBySlug,
    getSliceNotationBySlug,
    getSliceRecordingsBySlug,
    getSyncpointsByRecordingId,
    listFolders,
    listSlices,
    listSubfoldersByParentId,
    moveSliceToFolder,
    putRecordingSyncpoints,
    renameFolder,
  };
};
