/**
 * post-requests-without-payload.spec.js
 *
 * unit tests for the simpler POST requests
 * that do not include a payload in the request body
 */

/* global describe, expect, test, jest */

const { getApiClientInstance } = require(`../dist/get-api-client-instance.js`);

const {
  EXPECTED_BASE_AXIOS_CONFIG,
  SOUNDSLICE_APPLICATION_ID,
  SOUNDSLICE_PASSWORD,
} = require(`./test-helpers.js`);

const makeMockAxios = () => ({ post: jest.fn() });

describe(`POST requests without payload`, () => {
  test(`.duplicateSliceByScorehash method`, async () => {
    const mockAxios = makeMockAxios();
    const apiClient = getApiClientInstance({
      axios: mockAxios,
      SOUNDSLICE_APPLICATION_ID,
      SOUNDSLICE_PASSWORD,
    });

    const scorehash = `abcde`;
    const unusedResult = await apiClient.duplicateSliceByScorehash(scorehash);

    expect(mockAxios.post).toHaveBeenCalled();
    expect(mockAxios.post).toHaveBeenCalledWith(
      `/slices/abcde/duplicate/`,

      // the second `axios.post` argument should be `null`
      // when there is no payload in the request body
      null,

      EXPECTED_BASE_AXIOS_CONFIG,
    );
  });

  test(`.getRecordingUploadUrlByRecordingId method`, async () => {
    const mockAxios = makeMockAxios();
    const apiClient = getApiClientInstance({
      axios: mockAxios,
      SOUNDSLICE_APPLICATION_ID,
      SOUNDSLICE_PASSWORD,
    });

    const recordingId = `2468`;
    const unusedResult = await apiClient.getRecordingUploadUrlByRecordingId(
      recordingId,
    );

    expect(mockAxios.post).toHaveBeenCalled();
    expect(mockAxios.post).toHaveBeenCalledWith(
      `/recordings/2468/media/`,

      // the second `axios.post` argument should be `null`
      // when there is no payload in the request body
      null,

      EXPECTED_BASE_AXIOS_CONFIG,
    );
  });
});
