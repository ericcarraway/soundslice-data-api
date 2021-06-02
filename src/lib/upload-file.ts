import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { promises as fsp } from 'fs';

/**
 * Read a file from the filesystem & PUT it
 * to the `url` returned form `getRecordingUploadUrlByRecordingId`
 *
 * @param {string} pathToFile fully-qualified path to the file
 * @param {string} uploadUrl  fully-qualified URL to which we'll
 *                            make our PUT request
 */
const uploadFile = async function uploadFile({
  pathToFile,
  uploadUrl,
}: {
  pathToFile: string;
  uploadUrl: string;
}): Promise<AxiosResponse<any>> {
  const data = await fsp.readFile(pathToFile);

  const axiosConfig: AxiosRequestConfig = {
    data,

    // Do not include HTTP authentication
    // (username & password) with this request.
    headers: {},

    method: `PUT`,
    transformRequest: [
      (_data: Buffer, headers: any) => {
        /**
         * By default, Axios will add a 'Content-Type' header.
         *
         * However, the pre-signed Amazon S3 URLs will only work when we omit
         * this header.
         *
         * Otherwise, we'll see a 403 "Forbidden" error
         * and the unhelpful error message `SignatureDoesNotMatch`
         *     "The request signature we calculated does not match the signature you provided.
         *      Check your key and signing method."
         */

        // eslint-disable-next-line no-param-reassign
        delete headers.put[`Content-Type`];

        return _data;
      },
    ],
    url: uploadUrl,
  };

  const response = await axios(axiosConfig);

  return response;
};

export { uploadFile };
