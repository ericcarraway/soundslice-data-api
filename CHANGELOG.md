# Changelog

## 2021-11-26

- Published `v0.17.0`
- See https://github.com/ericcarraway/soundslice-data-api/pull/26
- Changed Node.js support to `"^12.22.0 || ^14.17.0 || >=16.0.0"`
- Bumped several `devDependencies`

## 2021-11-01

- Published `v0.16.0`
- See https://github.com/ericcarraway/soundslice-data-api/pull/25
- Bumped the HTTP client `axios` from `^0.21.4` to `^0.24.0`
- Bumped several `devDependencies`
- Removed an `any` type from `src/lib/upload-file.ts` where we remove `Content-Type` header from the PUT request to the pre-signed Amazon S3 URL
- Reformatted dates in CHANGELOG.md so that date headings are linkable in URLs
- Changed the name of the default branch from `primary` to `main`

## 2021-09-29

- Published `v0.15.1`
- See https://github.com/ericcarraway/soundslice-data-api/pull/21
- New methods:
  - `getNotationUploadUrlByScorehash`, which makes it possible to upload notation
  - `getSliceNotationByScorehash`
- New example scripts:
  - `getNotationUploadUrlByScorehash`
  - `getSliceNotationByScorehash`
  - `getSliceNotationBySlug`
- New unit tests:
  - `createSlice`
  - `getNotationUploadUrlByScorehash`
  - `getSliceNotationByScorehash`
  - `getSliceNotationBySlug`

## 2021-09-27

- Published `v0.14.1`
- See https://github.com/ericcarraway/soundslice-data-api/pull/19
- Bumped dependencies
- Removed Node.js 10 support
- Made minor refinements to TypeScript typings
- When running scripts in the examples directory:
  - The path to `.env` is more clear
  - When required credentials aren't found, log an error message

## 2021-06-04

- Published `v0.14.0`
- See https://github.com/ericcarraway/soundslice-data-api/pull/18
- TypeScript typings and tab-completion now work, even for projects using vanilla JavaScript. 🎉
- **BREAKING CHANGE** - To import this package in a CommonJS environment, make this change:

```diff
- const apiClient = require('@percuss.io/soundslice-data-api')({
+ const apiClient = require('@percuss.io/soundslice-data-api').default({
```

- Added Jest unit tests for many of the API methods
- Added method `deleteSliceByScorehash` & deprecated `deleteSliceBySlug`
- Changed `listSlices` to target `/slices/` instead of the deprecated `/scores/` endpoint

## 2021-06-03

- Published `v0.13.1` (hotfix for `tslib` dependency)
- Published `v0.13.0`
- Began a conversion to TypeScript
  - See https://github.com/ericcarraway/soundslice-data-api/pull/17
- Added more examples to the [examples folder](https://github.com/ericcarraway/soundslice-data-api/tree/primary/examples)
  - `listSubfoldersByParentId`
  - `getSyncpointsByRecordingId`
- Removed Mocha in favor of Jest for unit tests
- Bumped and added several `devDependencies`

## 2021-03-01

- Published `v0.12.1`
- Added three methods for uploading a recording:
  - Step 1: `createRecording`
  - Step 2: `getRecordingUploadUrlByRecordingId`
  - Step 3: `uploadFile`
- Marked `getSliceRecordingsBySlug` as deprecated and added `getSliceRecordingsByScorehash` in its place
- Added more examples to the [examples folder](https://github.com/ericcarraway/soundslice-data-api/tree/primary/examples)
- Extracted helper methods to a `/lib` folder

## 2021-01-02

- Published `v0.12.0`
- Added `putRecordingSyncpoints`
- Added example for `getSliceRecordingsBySlug`

## 2020-10-10

- Published `v0.11.0`
- Added `renameFolder`
- Published `v0.10.0`
- Added `createFolder`

## 2020-09-27

- Published `v0.9.0`
- Added `deleteFolderByFolderId`
- Published `v0.8.0`
- Added `deleteRecordingByRecordingId`

## 2020-09-19

- Published `v0.7.0`
- Added `duplicateSliceByScorehash`

## 2020-09-11

- Published `v0.6.0`
- Added `moveSliceToFolder`
- Added `async` / `await` example for `createSlice`

## 2020-08-28

- Added examples for `listSlices` & `getSliceBySlug`

## 2020-08-20

- Published `v0.5.1`
- Added basic smoke tests

## 2020-08-19

- Published `v0.5.0`
- Added `deleteSliceBySlug`

## 2020-08-18

- Published `v0.2.0`
- `createSlice`
- `getSliceBySlug`
- `getSliceNotationBySlug`
- `getSliceRecordingsBySlug`
- `getSyncpointsByRecordingId`
- `listFolders`
- `listSlices`
- `listSubfoldersByParentId`
