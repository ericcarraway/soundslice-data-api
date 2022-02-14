import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import { promises as fsp } from 'fs';
import { UploadFileParams } from '../types';

const isBuffer = (_data: Buffer): boolean =>
  _data && typeof _data === `object` && Buffer.isBuffer(_data);

/**
 * Read a file from the filesystem (or take a raw string of MusicXML),
 * and PUT it to the `url` returned from either
 * `getRecordingUploadUrlByRecordingId` or `getNotationUploadUrlByScorehash`.
 *
 * @param {string} uploadUrl  Required - The fully-qualified URL to which we'll
 *                            make our PUT request (an Amazon S3 presigned URL).
 *
 * One of either `pathToFile` or `rawString` is required.
 *
 * @param {string} pathToFile The fully-qualified path to a file on the filesystem.
 *                            When uploading music notation, Soundslice supports
 *                            MusicXML, Guitar Pro, PowerTab and TuxGuitar formats.
 *                            When uploading a recording, Soundslice supports
 *                            MP3 or video.
 *
 * @param {string} rawString If `pathToFile` is not provided, we'll attempt to upload
 *                           `rawString`, which can be a raw string of MusicXML.
 *
 */
const uploadFile = async function uploadFile(
  paramsObj: UploadFileParams,
): Promise<AxiosResponse<any>> {
  if (!paramsObj.uploadUrl || typeof paramsObj.uploadUrl !== `string`) {
    throw new Error(
      `ERROR: The method \`uploadFile\` failed to receive a string \`uploadUrl\`.`,
    );
  }

  let data: Buffer | null = null;

  if (
    `pathToFile` in paramsObj &&
    paramsObj.pathToFile &&
    typeof paramsObj.pathToFile === `string`
  ) {
    data = await fsp.readFile(paramsObj.pathToFile);

    if (!isBuffer(data)) {
      throw new Error(
        `ERROR: The method \`uploadFile\` received \`pathToFile\` but failed to receive a \`Buffer\` when reading the file.`,
      );
    }
  } else if (
    `rawString` in paramsObj &&
    paramsObj.rawString &&
    typeof paramsObj.rawString === `string`
  ) {
    data = Buffer.from(paramsObj.rawString, `utf8`);

    if (!isBuffer(data)) {
      throw new Error(
        `ERROR: The method \`uploadFile\` received \`rawString\` but failed to convert it to a \`Buffer\`.`,
      );
    }
  } else {
    throw new Error(
      `ERROR: The method \`uploadFile\` failed to receive either a string \`pathToFile\` or a string \`rawString\`.`,
    );
  }

  if (!isBuffer(data)) {
    throw new Error(
      `ERROR: The method \`uploadFile\` has no \`Buffer\` to upload.`,
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
    url: paramsObj.uploadUrl,
  };

  const response = await axios(axiosConfig);

  return response;
};

export { uploadFile };
