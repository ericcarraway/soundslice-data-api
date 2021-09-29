/* global describe, expect, test, jest */

const { getApiClientInstance } = require(`../dist/get-api-client-instance.js`);

const {
  EXPECTED_BASE_AXIOS_CONFIG,
  SOUNDSLICE_APPLICATION_ID,
  SOUNDSLICE_PASSWORD,
} = require(`./test-helpers.js`);

const makeMockAxios = () => ({ delete: jest.fn() });

describe(`DELETE requests`, () => {
  test(`.deleteFolderByFolderId method`, async () => {
    const mockAxios = makeMockAxios();
    const apiClient = getApiClientInstance({
      axios: mockAxios,
      SOUNDSLICE_APPLICATION_ID,
      SOUNDSLICE_PASSWORD,
    });

    const folderId = `4321`;
    const unusedResult = await apiClient.deleteFolderByFolderId(folderId);

    expect(mockAxios.delete).toHaveBeenCalled();
    expect(mockAxios.delete).toHaveBeenCalledTimes(1);
    expect(mockAxios.delete).toHaveBeenCalledWith(
      `/folders/4321/`,
      EXPECTED_BASE_AXIOS_CONFIG,
    );
  });

  test(`.deleteRecordingByRecordingId method`, async () => {
    const mockAxios = makeMockAxios();
    const apiClient = getApiClientInstance({
      axios: mockAxios,
      SOUNDSLICE_APPLICATION_ID,
      SOUNDSLICE_PASSWORD,
    });

    const recordingId = `2468`;
    const unusedResult = await apiClient.deleteRecordingByRecordingId(
      recordingId,
    );

    expect(mockAxios.delete).toHaveBeenCalled();
    expect(mockAxios.delete).toHaveBeenCalledTimes(1);
    expect(mockAxios.delete).toHaveBeenCalledWith(
      `/recordings/2468/`,
      EXPECTED_BASE_AXIOS_CONFIG,
    );
  });

  test(`.deleteSliceByScorehash method`, async () => {
    const mockAxios = makeMockAxios();
    const apiClient = getApiClientInstance({
      axios: mockAxios,
      SOUNDSLICE_APPLICATION_ID,
      SOUNDSLICE_PASSWORD,
    });

    const scorehash = `abcde`;
    const unusedResult = await apiClient.deleteSliceByScorehash(scorehash);

    expect(mockAxios.delete).toHaveBeenCalled();
    expect(mockAxios.delete).toHaveBeenCalledTimes(1);
    expect(mockAxios.delete).toHaveBeenCalledWith(
      `/slices/abcde/`,
      EXPECTED_BASE_AXIOS_CONFIG,
    );
  });

  test(`.deleteSliceBySlug method`, async () => {
    const mockAxios = makeMockAxios();
    const apiClient = getApiClientInstance({
      axios: mockAxios,
      SOUNDSLICE_APPLICATION_ID,
      SOUNDSLICE_PASSWORD,
    });

    const slug = `1357`;
    const unusedResult = await apiClient.deleteSliceBySlug(slug);

    expect(mockAxios.delete).toHaveBeenCalled();
    expect(mockAxios.delete).toHaveBeenCalledTimes(1);
    expect(mockAxios.delete).toHaveBeenCalledWith(
      `/scores/1357/`,
      EXPECTED_BASE_AXIOS_CONFIG,
    );
  });
});
