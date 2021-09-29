/* global describe, expect, test, jest */

const { getApiClientInstance } = require(`../dist/get-api-client-instance.js`);

const {
  EXPECTED_BASE_AXIOS_CONFIG,
  SOUNDSLICE_APPLICATION_ID,
  SOUNDSLICE_PASSWORD,
} = require(`./test-helpers.js`);

const makeMockAxios = () => ({ get: jest.fn() });

describe(`GET requests`, () => {
  test(`.getSliceBySlug method`, async () => {
    const mockAxios = makeMockAxios();
    const apiClient = getApiClientInstance({
      axios: mockAxios,
      SOUNDSLICE_APPLICATION_ID,
      SOUNDSLICE_PASSWORD,
    });

    const slug = `12345`;
    const unusedResult = await apiClient.getSliceBySlug(slug);

    expect(mockAxios.get).toHaveBeenCalled();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/scores/12345/`,
      EXPECTED_BASE_AXIOS_CONFIG,
    );
  });

  test(`.getSliceByScorehash method`, async () => {
    const mockAxios = makeMockAxios();
    const apiClient = getApiClientInstance({
      axios: mockAxios,
      SOUNDSLICE_APPLICATION_ID,
      SOUNDSLICE_PASSWORD,
    });

    const scorehash = `abcde`;
    const unusedResult = await apiClient.getSliceByScorehash(scorehash);

    expect(mockAxios.get).toHaveBeenCalled();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/slices/abcde/`,
      EXPECTED_BASE_AXIOS_CONFIG,
    );
  });

  test(`.getSliceNotationBySlug method`, async () => {
    const mockAxios = makeMockAxios();
    const apiClient = getApiClientInstance({
      axios: mockAxios,
      SOUNDSLICE_APPLICATION_ID,
      SOUNDSLICE_PASSWORD,
    });

    const slug = `12345`;
    const unusedResult = await apiClient.getSliceNotationBySlug(slug);

    expect(mockAxios.get).toHaveBeenCalled();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/scores/12345/notation/`,
      EXPECTED_BASE_AXIOS_CONFIG,
    );
  });

  test(`.getSliceRecordingsByScorehash method`, async () => {
    const mockAxios = makeMockAxios();
    const apiClient = getApiClientInstance({
      axios: mockAxios,
      SOUNDSLICE_APPLICATION_ID,
      SOUNDSLICE_PASSWORD,
    });

    const scorehash = `abcde`;
    const unusedResult = await apiClient.getSliceRecordingsByScorehash(
      scorehash,
    );

    expect(mockAxios.get).toHaveBeenCalled();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/slices/abcde/recordings/`,
      EXPECTED_BASE_AXIOS_CONFIG,
    );
  });

  test(`.getSliceNotationByScorehash method`, async () => {
    const mockAxios = makeMockAxios();
    const apiClient = getApiClientInstance({
      axios: mockAxios,
      SOUNDSLICE_APPLICATION_ID,
      SOUNDSLICE_PASSWORD,
    });

    const scorehash = `abcde`;
    const unusedResult = await apiClient.getSliceNotationByScorehash(scorehash);

    expect(mockAxios.get).toHaveBeenCalled();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/slices/abcde/notation-file/`,
      EXPECTED_BASE_AXIOS_CONFIG,
    );
  });

  test(`.getSliceNotationBySlug method`, async () => {
    const mockAxios = makeMockAxios();
    const apiClient = getApiClientInstance({
      axios: mockAxios,
      SOUNDSLICE_APPLICATION_ID,
      SOUNDSLICE_PASSWORD,
    });

    const slug = `12345`;
    const unusedResult = await apiClient.getSliceNotationBySlug(slug);

    expect(mockAxios.get).toHaveBeenCalled();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/scores/12345/notation/`,
      EXPECTED_BASE_AXIOS_CONFIG,
    );
  });

  test(`.getSliceRecordingsBySlug method`, async () => {
    const mockAxios = makeMockAxios();
    const apiClient = getApiClientInstance({
      axios: mockAxios,
      SOUNDSLICE_APPLICATION_ID,
      SOUNDSLICE_PASSWORD,
    });

    const slug = `12345`;
    const unusedResult = await apiClient.getSliceRecordingsBySlug(slug);

    expect(mockAxios.get).toHaveBeenCalled();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/scores/12345/recordings/`,
      EXPECTED_BASE_AXIOS_CONFIG,
    );
  });

  test(`.getSyncpointsByRecordingId method`, async () => {
    const mockAxios = makeMockAxios();
    const apiClient = getApiClientInstance({
      axios: mockAxios,
      SOUNDSLICE_APPLICATION_ID,
      SOUNDSLICE_PASSWORD,
    });

    const recordingId = `67890`;
    const unusedResult = await apiClient.getSyncpointsByRecordingId(
      recordingId,
    );

    expect(mockAxios.get).toHaveBeenCalled();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/recordings/67890/syncpoints/`,
      EXPECTED_BASE_AXIOS_CONFIG,
    );
  });

  test(`.listFolders method`, async () => {
    const mockAxios = makeMockAxios();
    const apiClient = getApiClientInstance({
      axios: mockAxios,
      SOUNDSLICE_APPLICATION_ID,
      SOUNDSLICE_PASSWORD,
    });

    const unusedResult = await apiClient.listFolders();

    expect(mockAxios.get).toHaveBeenCalled();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/folders/`,
      EXPECTED_BASE_AXIOS_CONFIG,
    );
  });

  test(`.listSlices method`, async () => {
    const mockAxios = makeMockAxios();
    const apiClient = getApiClientInstance({
      axios: mockAxios,
      SOUNDSLICE_APPLICATION_ID,
      SOUNDSLICE_PASSWORD,
    });

    const unusedResult = await apiClient.listSlices();

    expect(mockAxios.get).toHaveBeenCalled();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/slices/`,
      EXPECTED_BASE_AXIOS_CONFIG,
    );
  });

  test(`.listSubfoldersByParentId method`, async () => {
    const mockAxios = makeMockAxios();
    const apiClient = getApiClientInstance({
      axios: mockAxios,
      SOUNDSLICE_APPLICATION_ID,
      SOUNDSLICE_PASSWORD,
    });

    const parentId = `12345`;
    const unusedResult = await apiClient.listSubfoldersByParentId(parentId);

    expect(mockAxios.get).toHaveBeenCalled();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/folders/?parent_id=12345`,
      EXPECTED_BASE_AXIOS_CONFIG,
    );
  });
});
