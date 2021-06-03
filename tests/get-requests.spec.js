/* global describe, expect, test, jest */

/* eslint @typescript-eslint/no-unused-vars: ["error", { "varsIgnorePattern": "^unused" }] */

const { getApiClientInstance } = require(`../dist/get-api-client-instance.js`);

const {
  EXPECTED_BASE_AXIOS_CONFIG,
  SOUNDSLICE_APPLICATION_ID,
  SOUNDSLICE_PASSWORD,
} = require(`./test-helpers.js`);

describe(`GET requests`, () => {
  test(`.listFolders method`, async () => {
    const mockAxios = {
      get: jest.fn(),
    };

    const apiClient = getApiClientInstance({
      axios: mockAxios,
      SOUNDSLICE_APPLICATION_ID,
      SOUNDSLICE_PASSWORD,
    });

    const unusedResult = await apiClient.listFolders();

    expect(mockAxios.get).toHaveBeenCalled();

    expect(mockAxios.get).toHaveBeenCalledWith(
      `/folders/`,
      EXPECTED_BASE_AXIOS_CONFIG,
    );
  });

  test(`.listSlices method`, async () => {
    const mockAxios = {
      get: jest.fn(),
    };

    const apiClient = getApiClientInstance({
      axios: mockAxios,
      SOUNDSLICE_APPLICATION_ID,
      SOUNDSLICE_PASSWORD,
    });

    const unusedResult = await apiClient.listSlices();

    expect(mockAxios.get).toHaveBeenCalled();

    expect(mockAxios.get).toHaveBeenCalledWith(
      `/slices/`,
      EXPECTED_BASE_AXIOS_CONFIG,
    );
  });

  test(`.listSubfoldersByParentId method`, async () => {
    const mockAxios = {
      get: jest.fn(),
    };

    const apiClient = getApiClientInstance({
      axios: mockAxios,
      SOUNDSLICE_APPLICATION_ID,
      SOUNDSLICE_PASSWORD,
    });

    const parentId = `12345`;

    const unusedResult = await apiClient.listSubfoldersByParentId(parentId);

    expect(mockAxios.get).toHaveBeenCalled();

    expect(mockAxios.get).toHaveBeenCalledWith(
      `/folders/?parent_id=12345`,
      EXPECTED_BASE_AXIOS_CONFIG,
    );
  });
});
