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
        `createFolder`,
        `createRecording`,
        `createSlice`,
        `deleteFolderByFolderId`,
        `deleteRecordingByRecordingId`,
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

      expect(actual).to.eql(expected);
    });
  });

  describe(`createFolder`, () => {
    it(`should be a function`, () => {
      expect(apiClient.createFolder).to.be.a(`function`);
    });
  });

  describe(`createRecording`, () => {
    it(`should be a function`, () => {
      expect(apiClient.createRecording).to.be.a(`function`);
    });
  });

  describe(`createSlice`, () => {
    it(`should be a function`, () => {
      expect(apiClient.createSlice).to.be.a(`function`);
    });
  });

  describe(`deleteFolderByFolderId`, () => {
    it(`should be a function`, () => {
      expect(apiClient.deleteFolderByFolderId).to.be.a(`function`);
    });
  });

  describe(`deleteRecordingByRecordingId`, () => {
    it(`should be a function`, () => {
      expect(apiClient.deleteRecordingByRecordingId).to.be.a(`function`);
    });
  });

  describe(`deleteSliceBySlug`, () => {
    it(`should be a function`, () => {
      expect(apiClient.deleteSliceBySlug).to.be.a(`function`);
    });
  });

  describe(`duplicateSliceByScorehash`, () => {
    it(`should be a function`, () => {
      expect(apiClient.duplicateSliceByScorehash).to.be.a(`function`);
    });
  });

  describe(`getRecordingUploadUrlByRecordingId`, () => {
    it(`should be a function`, () => {
      expect(apiClient.getRecordingUploadUrlByRecordingId).to.be.a(`function`);
    });
  });

  describe(`getSliceByScorehash`, () => {
    it(`should be a function`, () => {
      expect(apiClient.getSliceByScorehash).to.be.a(`function`);
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

  describe(`getSliceRecordingsByScorehash`, () => {
    it(`should be a function`, () => {
      expect(apiClient.getSliceRecordingsByScorehash).to.be.a(`function`);
    });
  });

  // @deprecated since 2021-01-13
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

  describe(`putRecordingSyncpoints`, () => {
    it(`should be a function`, () => {
      expect(apiClient.putRecordingSyncpoints).to.be.a(`function`);
    });
  });

  describe(`renameFolder`, () => {
    it(`should be a function`, () => {
      expect(apiClient.renameFolder).to.be.a(`function`);
    });
  });

  describe(`uploadFile`, () => {
    it(`should be a function`, () => {
      expect(apiClient.uploadFile).to.be.a(`function`);
    });
  });
});
