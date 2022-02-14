import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import { promises as fsp } from 'fs';

/**
 * Read a file from the filesystem & PUT it
 * to the `url` returned from either
 * `getRecordingUploadUrlByRecordingId` or `getNotationUploadUrlByScorehash`
 *
 * @param {string} pathToFile fully-qualified path to the file on the filesystem
 *
 * @param {string} uploadUrl  fully-qualified URL to which we'll
 *                            make our PUT request (an Amazon S3 presigned URL)
 */
const uploadFile = async function uploadFile({
  pathToFile,
  uploadUrl,
}: {
  pathToFile: string;
  uploadUrl: string;
}): Promise<AxiosResponse<any>> {
  if (!uploadUrl || typeof uploadUrl !== `string`) {
    throw new Error(
      `ERROR: The method \`uploadFile\` failed to receive a string \`uploadUrl\`.`,
    );
  }

  if (!pathToFile || typeof pathToFile !== `string`) {
    throw new Error(
      `ERROR: The method \`uploadFile\` failed to receive a string \`pathToFile\`.`,
    );
  }

  const data: Buffer = await fsp.readFile(pathToFile);

  if (!data || typeof data !== `object` || !Buffer.isBuffer(data)) {
    throw new Error(
      `ERROR: The method \`uploadFile\` failed to receive a data object from \`readFile\`.`,
    );
  }

  const axiosConfig: AxiosRequestConfig = {
    data,

    // Do not include HTTP authentication
    // (username & password) with this request.
    headers: {},

    method: `PUT`,
    transformRequest: [
      (_data: Buffer, headers: AxiosRequestHeaders | undefined) => {
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
        if (
          headers &&
          typeof headers === `object` &&
          headers.put &&
          typeof headers.put === `object`
        ) {
          // eslint-disable-next-line no-param-reassign
          delete headers.put[`Content-Type`];
        }

        return _data;
      },
    ],
    url: uploadUrl,
  };

  const response = await axios(axiosConfig);

  return response;
};

export { uploadFile };
