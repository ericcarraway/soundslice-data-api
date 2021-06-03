/* global describe, expect, it */

require(`dotenv`).config();

const { SOUNDSLICE_APPLICATION_ID, SOUNDSLICE_PASSWORD } = process.env;

const apiClient = require(`../dist/index.js`).default({
  SOUNDSLICE_APPLICATION_ID,
  SOUNDSLICE_PASSWORD,
});

describe(`soundslice-data-api`, () => {
  describe(`object keys`, () => {
    it(`should have the expected methods`, () => {
      const actual = Object.keys(apiClient).sort();

      const expected = [
        `createFolder`,
        `createRecording`,
        `createSlice`,
        `deleteFolderByFolderId`,
        `deleteRecordingByRecordingId`,
        `deleteSliceByScorehash`,
        `deleteSliceBySlug`,
        `duplicateSliceByScorehash`,
        `getRecordingUploadUrlByRecordingId`,
        `getSliceByScorehash`,
        `getSliceBySlug`,
        `getSliceNotationBySlug`,
        `getSliceRecordingsByScorehash`,
        `getSliceRecordingsBySlug`,
        `getSyncpointsByRecordingId`,
        `listFolders`,
        `listSlices`,
        `listSubfoldersByParentId`,
        `moveSliceToFolder`,
        `putRecordingSyncpoints`,
        `renameFolder`,
        `uploadFile`,
      ];

      expect(actual).toEqual(expected);
    });
  });

  describe(`createFolder`, () => {
    it(`should be a function`, () => {
      expect(typeof apiClient.createFolder).toBe(`function`);
    });
  });

  describe(`createRecording`, () => {
    it(`should be a function`, () => {
      expect(typeof apiClient.createRecording).toBe(`function`);
    });
  });

  describe(`createSlice`, () => {
    it(`should be a function`, () => {
      expect(typeof apiClient.createSlice).toBe(`function`);
    });
  });

  describe(`deleteFolderByFolderId`, () => {
    it(`should be a function`, () => {
      expect(typeof apiClient.deleteFolderByFolderId).toBe(`function`);
    });
  });

  describe(`deleteRecordingByRecordingId`, () => {
    it(`should be a function`, () => {
      expect(typeof apiClient.deleteRecordingByRecordingId).toBe(`function`);
    });
  });

  describe(`deleteSliceByScorehash`, () => {
    it(`should be a function`, () => {
      expect(typeof apiClient.deleteSliceByScorehash).toBe(`function`);
    });
  });

  describe(`deleteSliceBySlug`, () => {
    it(`should be a function`, () => {
      expect(typeof apiClient.deleteSliceBySlug).toBe(`function`);
    });
  });

  describe(`duplicateSliceByScorehash`, () => {
    it(`should be a function`, () => {
      expect(typeof apiClient.duplicateSliceByScorehash).toBe(`function`);
    });
  });

  describe(`getRecordingUploadUrlByRecordingId`, () => {
    it(`should be a function`, () => {
      expect(typeof apiClient.getRecordingUploadUrlByRecordingId).toBe(
        `function`,
      );
    });
  });

  describe(`getSliceByScorehash`, () => {
    it(`should be a function`, () => {
      expect(typeof apiClient.getSliceByScorehash).toBe(`function`);
    });
  });

  describe(`getSliceBySlug`, () => {
    it(`should be a function`, () => {
      expect(typeof apiClient.getSliceBySlug).toBe(`function`);
    });
  });

  describe(`getSliceNotationBySlug`, () => {
    it(`should be a function`, () => {
      expect(typeof apiClient.getSliceNotationBySlug).toBe(`function`);
    });
  });

  describe(`getSliceRecordingsByScorehash`, () => {
    it(`should be a function`, () => {
      expect(typeof apiClient.getSliceRecordingsByScorehash).toBe(`function`);
    });
  });

  // @deprecated since 2021-01-13
  describe(`getSliceRecordingsBySlug`, () => {
    it(`should be a function`, () => {
      expect(typeof apiClient.getSliceRecordingsBySlug).toBe(`function`);
    });
  });

  describe(`getSyncpointsByRecordingId`, () => {
    it(`should be a function`, () => {
      expect(typeof apiClient.getSyncpointsByRecordingId).toBe(`function`);
    });
  });

  describe(`listFolders`, () => {
    it(`should be a function`, () => {
      expect(typeof apiClient.listFolders).toBe(`function`);
    });
  });

  describe(`listSlices`, () => {
    it(`should be a function`, () => {
      expect(typeof apiClient.listSlices).toBe(`function`);
    });
  });

  describe(`listSubfoldersByParentId`, () => {
    it(`should be a function`, () => {
      expect(typeof apiClient.listSubfoldersByParentId).toBe(`function`);
    });
  });

  describe(`moveSliceToFolder`, () => {
    it(`should be a function`, () => {
      expect(typeof apiClient.moveSliceToFolder).toBe(`function`);
    });
  });

  describe(`putRecordingSyncpoints`, () => {
    it(`should be a function`, () => {
      expect(typeof apiClient.putRecordingSyncpoints).toBe(`function`);
    });
  });

  describe(`renameFolder`, () => {
    it(`should be a function`, () => {
      expect(typeof apiClient.renameFolder).toBe(`function`);
    });
  });

  describe(`uploadFile`, () => {
    it(`should be a function`, () => {
      expect(typeof apiClient.uploadFile).toBe(`function`);
    });
  });
});
