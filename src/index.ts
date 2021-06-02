// https://www.soundslice.com/help/data-api/

import axios from 'axios';

// eslint-disable-next-line import/no-unresolved
import { getFormDataFromObj } from './lib/get-form-data-from-obj';
// eslint-disable-next-line import/no-unresolved
import { uploadFile } from './lib/upload-file';

// eslint-disable-next-line no-underscore-dangle
const _btoa = (b: string): string => Buffer.from(b).toString(`base64`);

const baseURL = `https://www.soundslice.com/api/v1`;

module.exports = ({
  SOUNDSLICE_APPLICATION_ID,
  SOUNDSLICE_PASSWORD,
}: {
  SOUNDSLICE_APPLICATION_ID: string;
  SOUNDSLICE_PASSWORD: string;
}) => {
  // https://en.wikipedia.org/wiki/Basic_access_authentication
  const SOUNDSLICE_API_KEY = _btoa(
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
  // eslint-disable-next-line @typescript-eslint/ban-types
  const post = (url: string, paramsObj: object) => {
    const formData = getFormDataFromObj(paramsObj);

    const config = {
      headers: {
        Authorization: headers.Authorization,
        ...formData.getHeaders(),
      },
    };

    return axios.post(`${baseURL}${url}`, formData, config);
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  const createFolder = (paramsObj: object) => post(`/folders/`, paramsObj);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const createSlice = (paramsObj: object) => post(`/scores/`, paramsObj);

  // required: source
  // optional: name, source_data, hls_url
  const createRecording = (paramsObj: { slug: string }) => {
    // `slug` must be included in `paramsObj`
    // because it's part of the URL we'll POST to
    //
    // however, we don't want to send it in the payload
    const { slug, ...paramsObjClone } = paramsObj;

    return post(`/scores/${slug}/recordings/`, paramsObjClone);
  };

  // required: folder_id
  // optional: user_id
  const moveSliceToFolder = (paramsObj: { slug: string }) => {
    // `slug` must be included in `paramsObj`
    // because it's part of the URL we'll POST to
    //
    // however, we don't want to send it in the payload
    const { slug, ...paramsObjClone } = paramsObj;

    return post(`/scores/${slug}/move/`, paramsObjClone);
  };

  // required: name
  const renameFolder = (paramsObj: { folderId: string }) => {
    // `folderId` must be included in `paramsObj`
    // because it's part of the URL we'll POST to
    //
    // however, we don't want to send it in the payload
    const { folderId, ...paramsObjClone } = paramsObj;

    return post(`/folders/${folderId}/`, paramsObjClone);
  };

  const axiosInstance = axios.create({ baseURL, headers });

  /**
   * duplicates a slice by its `scorehash`
   * sends a POST request with no body
   */
  const duplicateSliceByScorehash = (scorehash: string) =>
    axiosInstance.post(`/slices/${scorehash}/duplicate/`);

  /**
   * step 1 of the upload process
   * sends a POST request with no body
   * so that we can receive a temporary upload URL
   */
  const getRecordingUploadUrlByRecordingId = (recordingId: string) =>
    axiosInstance.post(`/recordings/${recordingId}/media/`);

  /**
   * Sets the syncpoints for the recording with ID `recordingId`.
   *
   * @see https://www.soundslice.com/help/data-api/#putsyncpoints
   *
   * @param {Object} paramsObj paramsObj
   * paramsObj.recordingId (Required) part of the URL we'll POST to
   * paramsObj.syncpoints (Required) an array of syncpoint arrays
   *
   * paramsObj.crop_start (Optional) floating-point number
   * paramsObj.crop_end   (Optional) floating-point number
   *
   * @return {Promise} an Axios promise
   */
  const putRecordingSyncpoints = (paramsObj: {
    recordingId: string;
    syncpoints: number[][];
  }) => {
    const { recordingId, syncpoints, ...paramsObjClone } = paramsObj;

    if (syncpoints) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      paramsObjClone.syncpoints = JSON.stringify(syncpoints);
    }

    return post(`/recordings/${recordingId}/syncpoints/`, paramsObjClone);
  };

  // all DELETE methods...
  const deleteFolderByFolderId = (folderId: string) =>
    axiosInstance.delete(`/folders/${folderId}/`);
  const deleteRecordingByRecordingId = (recordingId: string) =>
    axiosInstance.delete(`/recordings/${recordingId}/`);
  const deleteSliceBySlug = (slug: string) =>
    axiosInstance.delete(`/scores/${slug}/`);

  const { get } = axiosInstance;

  // all GET methods...
  // get the details of a slice by its `slug`
  const getSliceBySlug = (slug: string) => get(`/scores/${slug}/`);

  // get the details of a slice by its `scorehash`
  // while useful, please note that as of 2021-02-27
  // this is still technically an undocumented API method
  // it may change at any time
  const getSliceByScorehash = (scorehash: string) =>
    get(`/slices/${scorehash}/`);

  const getSliceNotationBySlug = (slug: string) =>
    get(`/scores/${slug}/notation/`);

  const getSliceRecordingsByScorehash = (scorehash: string) =>
    get(`/slices/${scorehash}/recordings/`);

  /**
   * @deprecated
   * Per the Soundslice data API changelog entry on 2021-01-13,
   * a slice's recordings should be retrieved by using the scorehash instead of the slug.
   * This method still works for backwards compatibility,
   * but new code should use `getSliceRecordingsByScorehash`.
   */
  const getSliceRecordingsBySlug = (slug: string) =>
    get(`/scores/${slug}/recordings/`);

  const getSyncpointsByRecordingId = (recordingId: string) =>
    get(`/recordings/${recordingId}/syncpoints/`);
  const listFolders = () => get(`/folders/`);
  const listSlices = () => get(`/scores/`);
  const listSubfoldersByParentId = (parentId: string) =>
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

    // undocumented
    getSliceByScorehash,

    getSliceBySlug,
    getSliceNotationBySlug,
    getSliceRecordingsByScorehash,

    // deprecated
    getSliceRecordingsBySlug,

    getSyncpointsByRecordingId,
    listFolders,
    listSlices,
    listSubfoldersByParentId,
    moveSliceToFolder,
    putRecordingSyncpoints,
    renameFolder,
    uploadFile,
  };
};
