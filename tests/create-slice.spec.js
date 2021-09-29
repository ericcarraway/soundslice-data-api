/* global describe, expect, test, jest */

const { getApiClientInstance } = require(`../dist/get-api-client-instance.js`);

const {
  EXPECTED_BASE_AXIOS_CONFIG,
  SOUNDSLICE_APPLICATION_ID,
  SOUNDSLICE_PASSWORD,
} = require(`./test-helpers.js`);

const makeMockAxios = () => ({ post: jest.fn() });

describe(`POST requests`, () => {
  test(`.createSlice method`, async () => {
    const mockAxios = makeMockAxios();
    const apiClient = getApiClientInstance({
      axios: mockAxios,
      SOUNDSLICE_APPLICATION_ID,
      SOUNDSLICE_PASSWORD,
    });

    const paramsObj = {
      artist: `TEST_ARTIST`,
      embed_status: 4,
      folder_id: `12345`,
      name: `TEST_NAME`,
      print_status: 3,
      status: 1,
    };

    const expectedBase = {
      _currentStream: null,
      _insideLoop: false,
      _overheadLength: 643,
      _pendingNext: false,
      _released: false,

      // the total number of characters
      // in the values of `paramsObj`
      _valueLength: 28,

      _valuesToMeasure: [],
      dataSize: 0,
      maxDataSize: 2097152,
      pauseStreams: true,
      readable: true,
      writable: false,
    };

    const unusedResult = await apiClient.createSlice(paramsObj);

    expect(mockAxios.post).toHaveBeenCalled();
    expect(mockAxios.post).toHaveBeenCalledWith(
      `/slices/`,
      expect.objectContaining({
        ...expectedBase,
        // by default, the boundary consists of 26 - followed by 24 numbers
        // https://github.com/form-data/form-data
        _boundary: expect.stringContaining(`--------------------------`),
        _streams: expect.arrayContaining([
          expect.stringContaining(`--------------------------`),
          expect.stringMatching(
            /Content-Disposition: form-data; name="artist"\r\n\r\n/,
          ),
          expect.stringContaining(`TEST_ARTIST`),
          expect.stringMatching(
            /Content-Disposition: form-data; name="embed_status"\r\n\r\n/,
          ),
          expect.stringContaining(`4`),
          expect.stringMatching(
            /Content-Disposition: form-data; name="folder_id"\r\n\r\n/,
          ),
          expect.stringContaining(`12345`),
          expect.stringMatching(`Content-Disposition: form-data; name="name"`),
          expect.stringContaining(`TEST_NAME`),
          expect.stringMatching(
            /Content-Disposition: form-data; name="print_status"\r\n\r\n/,
          ),
          expect.stringContaining(`3`),
          expect.stringMatching(
            /Content-Disposition: form-data; name="status"\r\n\r\n/,
          ),
          expect.stringContaining(`1`),
        ]),
      }),
      expect.objectContaining({
        baseURL: EXPECTED_BASE_AXIOS_CONFIG.baseURL,
        headers: {
          ...EXPECTED_BASE_AXIOS_CONFIG.headers,
          'content-type': expect.stringContaining(
            `multipart/form-data; boundary=--------------------------`,
          ),
        },
      }),
    );
  });
});
