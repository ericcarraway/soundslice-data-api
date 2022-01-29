/* eslint camelcase: ["error", {allow: [
  "crop_end", "crop_start", "embed_status", "folder_id",
  "hls_url", "parent_id", "print_status", "source_data", "user_id" ]}] */

// https://www.soundslice.com/help/data-api/

import { AxiosRequestConfig, AxiosStatic } from 'axios';
import { getFormDataFromObj } from './lib/get-form-data-from-obj';
import { uploadFile } from './lib/upload-file';
import { CreateRecordingParams, Syncpoint } from './types';

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
  const postWithFormData = (
    url: string,
    paramsObj: Record<string, unknown>,
  ) => {
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

  /**
   * Creates a recording in the slice with the given `scorehash` or `slug`.
   * Either `scorehash` (a string) or `slug` (a string or integer) is required.
   *
   * @see https://www.soundslice.com/help/data-api/#createrecording
   *
   * If `scorehash` is provided, we'll POST to `/slices/${scorehash}/recordings/`.
   * Or, if `slug` is provided, we'll POST to `/scores/${slug}/recordings/`.
   *
   * `source` an integer, required
   * `name` a string, optional
   * `source_data` a string, sometimes optional
   * `hls_url` a string, sometimes optional
   */
  const createRecording = (paramsObj: CreateRecordingParams) => {
    const paramsObjToPOST: Record<string, unknown> = { ...paramsObj };
    let urlToPostTo = ``;

    if (`scorehash` in paramsObj) {
      urlToPostTo = `/slices/${paramsObj.scorehash}/recordings/`;
    } else if (`slug` in paramsObj) {
      urlToPostTo = `/scores/${paramsObj.slug}/recordings/`;
    }

    if (!urlToPostTo) {
      throw new Error(
        `ERROR: The method \`createRecording\` requires either a \`scorehash\` or a \`slug\`.`,
      );
    }

    // `scorehash` or `slug` must be included in `paramsObj`
    // because it's part of the URL we'll POST to
    //
    // however, we don't want to send it in the payload
    if (`scorehash` in paramsObjToPOST) {
      delete paramsObjToPOST.scorehash;
    }
    if (`slug` in paramsObjToPOST) {
      delete paramsObjToPOST.slug;
    }

    return postWithFormData(urlToPostTo, paramsObjToPOST);
  };

  const moveSliceToFolder = (paramsObj: {
    slug: number | string;
    folder_id: number | string;
    user_id?: number | string;
  }) => {
    const paramsObjToPOST: Record<string, unknown> = { ...paramsObj };

    // `slug` must be included in `paramsObj`
    // because it's part of the URL we'll POST to
    //
    // however, we don't want to send it in the payload
    delete paramsObjToPOST.slug;

    // NOTE:
    // Soundslice docs indicate that a new endpoint, `/slices/${scorehash}/move/`,
    // has been created. That may be preferred over `/scores/${slug}/move/`.
    return postWithFormData(`/scores/${paramsObj.slug}/move/`, paramsObjToPOST);
  };

  const renameFolder = (paramsObj: {
    folderId: number | string;
    name: string;
  }) => {
    const paramsObjToPOST: Record<string, unknown> = { ...paramsObj };

    // `folderId` must be included in `paramsObj`
    // because it's part of the URL we'll POST to
    //
    // however, we don't want to send it in the payload
    delete paramsObjToPOST.folderId;

    return postWithFormData(`/folders/${paramsObj.folderId}/`, paramsObjToPOST);
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
   * step 1 of the notation upload process
   * sends a POST request
   * so that we can receive a temporary upload URL
   *
   * @see https://www.soundslice.com/help/data-api/#putnotation
   *
   * TODO: include the optional param `callback_url`
   */
  const getNotationUploadUrlByScorehash = (scorehash: string) =>
    axiosWrapper.post(`/slices/${scorehash}/notation-file/`);

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
    syncpoints: Syncpoint[];
    crop_start?: number;
    crop_end?: number;
  }) => {
    const paramsObjToPOST: Record<string, unknown> = { ...paramsObj };

    // `recordingId` must be included in `paramsObj`
    // because it's part of the URL we'll POST to
    //
    // however, we don't want to send it in the payload
    delete paramsObjToPOST.recordingId;

    if (paramsObjToPOST.syncpoints) {
      paramsObjToPOST.syncpoints = JSON.stringify(paramsObjToPOST.syncpoints);
    }

    return postWithFormData(
      `/recordings/${paramsObj.recordingId}/syncpoints/`,
      paramsObjToPOST,
    );
  };

  /**
   * - Changes data for the recording with ID `recordingId`.
   * - It's possible change a recording's `name`, and/or `source_data`, and/or `hls_url`.
   * - Makes a POST request with the given parameters.
   * - Other than `recordingId`, all params are optional.
   * - If you don’t want to change a particular value, simply don't send its key with the request.
   * @see https://www.soundslice.com/help/data-api/#changerecording
   *
   * @param {Object} paramsObj paramsObj
   * paramsObj.recordingId (Required) part of the URL we'll POST to
   *
   * paramsObj.name        (Optional) The name of the recording. Limit 100 characters.
   * paramsObj.source_data (Optional) Extra data, depending on the value of `source`.
   * paramsObj.hls_url     (Optional) The URL for an HLS playlist for this recording,
   *                                  if `source` is 3.
   *
   * @return {Promise} an Axios promise
   */
  const changeRecording = (paramsObj: {
    recordingId: number | string;
    name?: string;
    source_data?: string;
    hls_url?: string;
  }) => {
    const paramsObjToPOST: Record<string, unknown> = { ...paramsObj };

    // `recordingId` must be included in `paramsObj`
    // because it's part of the URL we'll POST to
    //
    // however, we don't want to send it in the payload
    delete paramsObjToPOST.recordingId;

    return postWithFormData(
      `/recordings/${paramsObj.recordingId}/`,
      paramsObjToPOST,
    );
  };

  /**
   * - Reorder a slice's recordings.
   * - Sets the order of the recordings in the slice with a given `scorehash`.
   * @see https://www.soundslice.com/help/data-api/#reorderrecordings
   *
   * @param {Object} paramsObj paramsObj
   * paramsObj.scorehash (Required) The slice whose recordings you'd like to reorder.
   * paramsObj.order     (Required) An array of recording IDs in your requested order.
   *                     **OR** a string of recording IDs separated by commas.
   *
   * @return {Promise} an Axios promise
   */
  const reorderSliceRecordings = (paramsObj: {
    scorehash: number | string;
    order: string | string[] | number[];
  }) => {
    const { order, scorehash } = paramsObj;

    // if the caller has supplied an array of recording IDs,
    // convert that to the format expected by Soundslice
    const orderedRecordingIdsCSV = Array.isArray(order)
      ? order.join(`,`)
      : order;

    return postWithFormData(`/slices/${scorehash}/recordings/order/`, {
      order: orderedRecordingIdsCSV,
    });
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

  /**
   * Retrieves the original uploaded notation file for a slice with a given `scorehash`.
   * @see https://www.soundslice.com/help/data-api/#getnotation
   */
  const getSliceNotationByScorehash = (scorehash: string) =>
    axiosWrapper.get(`/slices/${scorehash}/notation-file/`);

  /**
   * Retrieves the original uploaded notation file for a slice with a given `slug`.
   */
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
    changeRecording,
    createFolder,
    createRecording,
    createSlice,
    deleteFolderByFolderId,
    deleteRecordingByRecordingId,
    deleteSliceByScorehash,

    // deprecated
    deleteSliceBySlug,

    duplicateSliceByScorehash,
    getNotationUploadUrlByScorehash,
    getRecordingUploadUrlByRecordingId,
    getSliceByScorehash,

    // deprecated
    getSliceBySlug,

    getSliceNotationByScorehash,
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
    reorderSliceRecordings,
    uploadFile,
  };
};

export { getApiClientInstance };
