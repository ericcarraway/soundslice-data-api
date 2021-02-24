// https://www.soundslice.com/help/data-api/

const axios = require(`axios`);
const FormData = require(`form-data`);

const btoa = (b) => Buffer.from(b).toString(`base64`);

// helper function to convert a plain JS object to form data
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

  /**
   * helper function
   * - converts a plain JS object to form data
   * - adds the auth header
   * - sends a POST to the specified URL
   */
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

  const createRecording = (paramsObj) => {
    const { slug } = paramsObj;
    const paramsObjClone = { ...paramsObj };

    delete paramsObjClone.slug;

    // required: source
    // optional: name, source_data, hls_url
    return post(`${baseURL}/scores/${slug}/recordings/`, paramsObjClone);
  };

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

  /**
   * duplicates a slice by its `scorehash`
   * sends a POST request with no body
   */
  const duplicateSliceByScorehash = (scorehash) =>
    axiosInstance.post(`/slices/${scorehash}/duplicate/`);

  /**
   * step 1 of the upload process
   * sends a POST request with no body
   * so that we can receive a temporary upload URL
   */
  const getRecordingUploadUrlByRecordingId = (recordingId) =>
    axiosInstance.post(`/recordings/${recordingId}/media/`);

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

  const getSliceRecordingsByScorehash = (scorehash) =>
    get(`/slices/${scorehash}/recordings/`);

  /**
   * @deprecated
   * Per the Soundslice data API changelog entry on 2021-01-13,
   * a slice's recordings should be retrieved by using the scorehash instead of the slug.
   * This method still works for backwards compatibility,
   * but new code should use `getSliceRecordingsByScorehash`.
   */
  const getSliceRecordingsBySlug = (slug) => get(`/scores/${slug}/recordings/`);

  const getSyncpointsByRecordingId = (recordingId) =>
    get(`/recordings/${recordingId}/syncpoints/`);
  const listFolders = () => get(`/folders/`);
  const listSlices = () => get(`/scores/`);
  const listSubfoldersByParentId = (parentId) =>
    get(`/folders/?parent_id=${parentId}`);

  return {
    createFolder,
    createRecording,
    createSlice,
    deleteFolderByFolderId,
    deleteRecordingByRecordingId,
    deleteSliceBySlug,
    duplicateSliceByScorehash,
    getRecordingUploadUrlByRecordingId,
    getSliceBySlug,
    getSliceNotationBySlug,
    getSliceRecordingsByScorehash,
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
