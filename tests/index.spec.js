require(`dotenv`).config();

const { expect } = require(`chai`);

const { SOUNDSLICE_APPLICATION_ID, SOUNDSLICE_PASSWORD } = process.env;

const apiClient = require(`../index.js`)({
  SOUNDSLICE_APPLICATION_ID,
  SOUNDSLICE_PASSWORD,
});

describe(`soundslice-data-api`, () => {
  describe(`object keys`, () => {
    it(`should have the expected methods`, () => {
      const actual = Object.keys(apiClient).sort();

      const expected = [
        `createSlice`,
        `deleteSliceBySlug`,
        `getSliceBySlug`,
        `getSliceNotationBySlug`,
        `getSliceRecordingsBySlug`,
        `getSyncpointsByRecordingId`,
        `listFolders`,
        `listSlices`,
        `listSubfoldersByParentId`,
        `moveSliceToFolder`,
      ];

      expect(actual).to.eql(expected);
    });
  });

  describe(`createSlice`, () => {
    it(`should be a function`, () => {
      expect(apiClient.createSlice).to.be.a(`function`);
    });
  });

  describe(`deleteSliceBySlug`, () => {
    it(`should be a function`, () => {
      expect(apiClient.deleteSliceBySlug).to.be.a(`function`);
    });
  });

  describe(`getSliceBySlug`, () => {
    it(`should be a function`, () => {
      expect(apiClient.getSliceBySlug).to.be.a(`function`);
    });
  });

  describe(`getSliceNotationBySlug`, () => {
    it(`should be a function`, () => {
      expect(apiClient.getSliceNotationBySlug).to.be.a(`function`);
    });
  });

  describe(`getSliceRecordingsBySlug`, () => {
    it(`should be a function`, () => {
      expect(apiClient.getSliceRecordingsBySlug).to.be.a(`function`);
    });
  });

  describe(`getSyncpointsByRecordingId`, () => {
    it(`should be a function`, () => {
      expect(apiClient.getSyncpointsByRecordingId).to.be.a(`function`);
    });
  });

  describe(`listFolders`, () => {
    it(`should be a function`, () => {
      expect(apiClient.listFolders).to.be.a(`function`);
    });
  });

  describe(`listSlices`, () => {
    it(`should be a function`, () => {
      expect(apiClient.listSlices).to.be.a(`function`);
    });
  });

  describe(`listSubfoldersByParentId`, () => {
    it(`should be a function`, () => {
      expect(apiClient.listSubfoldersByParentId).to.be.a(`function`);
    });
  });

  describe(`moveSliceToFolder`, () => {
    it(`should be a function`, () => {
      expect(apiClient.moveSliceToFolder).to.be.a(`function`);
    });
  });
});
