/* eslint camelcase: ["error", {allow: [
  "crop_end", "crop_start", "embed_status", "folder_id",
  "hls_url", "parent_id", "print_status", "source_data", "user_id" ]}] */

// https://www.soundslice.com/help/data-api/

import { AxiosRequestConfig, AxiosStatic } from 'axios';

import { getFormDataFromObj } from './lib/get-form-data-from-obj';
import { uploadFile } from './lib/upload-file';

// eslint-disable-next-line no-underscore-dangle
const _btoa = (b: string): string => Buffer.from(b).toString(`base64`);

const baseURL = `https://www.soundslice.com/api/v1`;

const getApiClientInstance = ({
  axios,
  SOUNDSLICE_APPLICATION_ID,
  SOUNDSLICE_PASSWORD,
}: {
  axios: AxiosStatic;
  SOUNDSLICE_APPLICATION_ID: string;
  SOUNDSLICE_PASSWORD: string;
}) => {
  // https://en.wikipedia.org/wiki/Basic_access_authentication
  const SOUNDSLICE_API_KEY = _btoa(
    `${SOUNDSLICE_APPLICATION_ID}:${SOUNDSLICE_PASSWORD}`,
  );

  const baseAxiosConfig: AxiosRequestConfig = {
    baseURL,
    headers: {
      Authorization: `Basic ${SOUNDSLICE_API_KEY}`,
    },
  };

  /**
   * helper function
   * - converts a plain JS object to form data
   * - adds the auth header
   * - sends a POST to the specified URL
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  const postWithFormData = (url: string, paramsObj: object) => {
    const formData = getFormDataFromObj(paramsObj);

    const axiosConfig: AxiosRequestConfig = {
      ...baseAxiosConfig,
      headers: {
        ...baseAxiosConfig.headers,
        ...formData.getHeaders(),
      },
    };

    return axios.post(url, formData, axiosConfig);
  };

  /**
   * Creates a folder within your account's slice manager.
   *
   * @param {string} name Required - The name of the folder.
   * @param {string} parent_id Optional - Integer.
   *                           The folder's parent ID.
   *                           Use this if you want to nest a folder within another one.
   */
  const createFolder = (paramsObj: { name: string; parent_id?: number }) =>
    postWithFormData(`/folders/`, paramsObj);

  // all params are optional
  const createSlice = (paramsObj: {
    artist?: string;

    // 1 — Disabled (default value, if not provided)
    // 2 — Enabled on any domain (option only available for certain accounts)
    // 4 — Enabled on allowlist domains
    embed_status?: number;

    folder_id?: number | string;
    name?: string;

    // 1 — Printing is disabled (default)
    // 3 — Printing is allowed
    print_status?: number;

    // 1 - "Only me" (default value, if not provided)
    // 3 - "Anybody who knows its URL"
    status?: number;
  }) => postWithFormData(`/slices/`, paramsObj);

  const createRecording = (paramsObj: {
    // Required
    slug: number | string;

    // If not given, this will be "Audio" or "Video", depending on the type of recording.
    name?: string;

    // Required
    source: number;

    source_data?: string;

    hls_url?: string;
  }) => {
    // `slug` must be included in `paramsObj`
    // because it's part of the URL we'll POST to
    //
    // however, we don't want to send it in the payload
    const { slug, ...paramsObjToPOST } = paramsObj;

    // NOTE:
    // Soundslice docs indicate that a new endpoint, `/slices/${scorehash}/recordings/`,
    // has been created. That may be preferred over `/scores/${slug}/recordings/`.
    return postWithFormData(`/scores/${slug}/recordings/`, paramsObjToPOST);
  };

  const moveSliceToFolder = (paramsObj: {
    slug: number | string;
    folder_id: number | string;
    user_id?: number | string;
  }) => {
    // `slug` must be included in `paramsObj`
    // because it's part of the URL we'll POST to
    //
    // however, we don't want to send it in the payload
    const { slug, ...paramsObjToPOST } = paramsObj;

    // NOTE:
    // Soundslice docs indicate that a new endpoint, `/slices/${scorehash}/move/`,
    // has been created. That may be preferred over `/scores/${slug}/move/`.
    return postWithFormData(`/scores/${slug}/move/`, paramsObjToPOST);
  };

  const renameFolder = (paramsObj: {
    folderId: number | string;
    name: string;
  }) => {
    // `folderId` must be included in `paramsObj`
    // because it's part of the URL we'll POST to
    //
    // however, we don't want to send it in the payload
    const { folderId, ...paramsObjToPOST } = paramsObj;

    return postWithFormData(`/folders/${folderId}/`, paramsObjToPOST);
  };

  // these HTTP methods won't include a payload in the request body
  const axiosWrapper = {
    delete: (url: string) => axios.delete(url, baseAxiosConfig),
    get: (url: string) => axios.get(url, baseAxiosConfig),
    post: (url: string) => axios.post(url, null, baseAxiosConfig),
  };

  /**
   * duplicates a slice by its `scorehash`
   * sends a POST request with no body
   *
   * QUESTION: are newly-created slices ending up in the same subfolder as the original?
   * the docs state
   * "The newly created slice will live in the top level of your slice manager."
   */
  const duplicateSliceByScorehash = (scorehash: string) =>
    axiosWrapper.post(`/slices/${scorehash}/duplicate/`);

  /**
   * step 1 of the upload process
   * sends a POST request with no body
   * so that we can receive a temporary upload URL
   */
  const getRecordingUploadUrlByRecordingId = (recordingId: number | string) =>
    axiosWrapper.post(`/recordings/${recordingId}/media/`);

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
    recordingId: number | string;
    syncpoints: number[][];
    crop_start?: number;
    crop_end?: number;
  }) => {
    const { recordingId, syncpoints, ...paramsObjToPOST } = paramsObj;

    if (syncpoints) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      paramsObjToPOST.syncpoints = JSON.stringify(syncpoints);
    }

    return postWithFormData(
      `/recordings/${recordingId}/syncpoints/`,
      paramsObjToPOST,
    );
  };

  // all DELETE methods...
  const deleteFolderByFolderId = (folderId: number | string) =>
    axiosWrapper.delete(`/folders/${folderId}/`);

  const deleteRecordingByRecordingId = (recordingId: number | string) =>
    axiosWrapper.delete(`/recordings/${recordingId}/`);

  /**
   * deletes a slice by its `scorehash`
   */
  const deleteSliceByScorehash = (scorehash: string) =>
    axiosWrapper.delete(`/slices/${scorehash}/`);

  /**
   * @deprecated NOTE: most "by slug" methods are no longer documented
   * use the corresponding "by scorehash" method instead
   * @see deleteSliceByScorehash
   *
   * deletes a slice by its `slug`
   */
  const deleteSliceBySlug = (slug: number | string) =>
    axiosWrapper.delete(`/scores/${slug}/`);

  // all GET methods...

  /**
   * @deprecated NOTE: most "by slug" methods are no longer documented
   * use the corresponding "by scorehash" method instead
   * @see getSliceByScorehash
   *
   * retrieves metadata for a slice by its `slug`
   */
  const getSliceBySlug = (slug: number | string) =>
    axiosWrapper.get(`/scores/${slug}/`);

  /**
   * retrieves metadata for a slice by its `scorehash`
   */
  const getSliceByScorehash = (scorehash: string) =>
    axiosWrapper.get(`/slices/${scorehash}/`);

  const getSliceNotationBySlug = (slug: number | string) =>
    axiosWrapper.get(`/scores/${slug}/notation/`);

  const getSliceRecordingsByScorehash = (scorehash: string) =>
    axiosWrapper.get(`/slices/${scorehash}/recordings/`);

  /**
   * @deprecated
   * Per the Soundslice data API changelog entry on 2021-01-13,
   * a slice's recordings should be retrieved by using the scorehash instead of the slug.
   * This method still works for backwards compatibility,
   * but new code should use `getSliceRecordingsByScorehash`.
   *
   * @see getSliceRecordingsByScorehash
   */
  const getSliceRecordingsBySlug = (slug: number | string) =>
    axiosWrapper.get(`/scores/${slug}/recordings/`);

  const getSyncpointsByRecordingId = (recordingId: number | string) =>
    axiosWrapper.get(`/recordings/${recordingId}/syncpoints/`);

  // by default, this lists only the top-level folders
  // to list subfolders within a given folder, use `listSubfoldersByParentId`
  const listFolders = () => axiosWrapper.get(`/folders/`);

  const listSlices = () => axiosWrapper.get(`/slices/`);

  // list subfolders within a given folder
  const listSubfoldersByParentId = (parentId: number | string) =>
    axiosWrapper.get(`/folders/?parent_id=${parentId}`);

  return {
    createFolder,
    createRecording,
    createSlice,
    deleteFolderByFolderId,
    deleteRecordingByRecordingId,
    deleteSliceByScorehash,

    // deprecated
    deleteSliceBySlug,

    duplicateSliceByScorehash,
    getRecordingUploadUrlByRecordingId,
    getSliceByScorehash,

    // deprecated
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

export { getApiClientInstance };
