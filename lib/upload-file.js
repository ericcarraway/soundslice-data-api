const fs = require(`fs`).promises;

const axios = require(`axios`);

/**
 * Read a file from the filesystem & PUT it
 * to the `url` returned form `getRecordingUploadUrlByRecordingId`
 *
 * @param {string} pathToFile fully-qualified path to the file
 * @param {string} uploadUrl  full-qualified URL to which we'll
 *                            make our PUT request
 */
const uploadFile = async function uploadFile({ pathToFile, uploadUrl }) {
  const data = await fs.readFile(pathToFile);

  const axiosConfig = {
    data,

    // Do not include HTTP authentication
    // (username & password) with this request.
    headers: {},

    method: `PUT`,
    transformRequest: [
      (_data, headers) => {
        /**
         * By default, Axios wants to add a 'Content-Type' header.
         *
         * However, the pre-signed S3 URLs will only work when we omit
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

module.exports = { uploadFile };
