# soundslice-data-api

Unofficial Node.js client for the [Soundslice data API](https://www.soundslice.com/help/data-api/)

### 1. Install

https://www.npmjs.com/package/@percuss.io/soundslice-data-api

```shell
$ npm install @percuss.io/soundslice-data-api
```

### 2. Import & Instantiate the Client

```javascript
// Soundslice data API keys from
// https://www.soundslice.com/help/data-api/
const { SOUNDSLICE_APPLICATION_ID, SOUNDSLICE_PASSWORD } = process.env;

const apiClient = require('@percuss.io/soundslice-data-api')({
  SOUNDSLICE_APPLICATION_ID,
  SOUNDSLICE_PASSWORD,
});
```

### 3. Usage

```javascript
apiClient.listSlices().then(handleSuccess).catch(handleError);

function handleSuccess(res) {
  const { data } = res;

  console.log(data);
}

function handleError(err) {
  const { response } = err;

  console.error(response.status);
  console.error(response.statusText);
}
```

## Client Methods

Each method returns an [Axios](https://github.com/axios/axios) Promise.

### **NOTE:** Not all API methods have been implemented yet.

#### `createSlice()`

- Creates a slice.
- Soundslice documentation: ["Create slice"](https://www.soundslice.com/help/data-api/#createslice)

```javascript
// all params are optional
apiClient.createSlice({
  // "Title" in Soundslice's form modal
  name: 'The Quick Brown Fox',

  artist: 'Lazy Dog',

  // allow embedding on whitelist domains
  // disabled when omitted
  embed_status: 4,

  // the folder in which to create the slice
  // created in the root folder when omitted
  folder_id: '12345',

  // allow printing
  // disallowed when omitted
  print_status: 3,

  // viewable by anyone who knows its URL
  // private when omitted
  status: 3,
})
```

#### `deleteSliceBySlug(slug)`

- Deletes the slice with slug `slug`, including all its associated data such as recordings.
- Soundslice documentation: ["Delete slice"](https://www.soundslice.com/help/data-api/#deleteslice)

```javascript
apiClient.deleteSliceBySlug('123456')
```

#### `listSlices()`

- Retrieves metadata for all slices in your account.
- Soundslice documentation: ["List slices"](https://www.soundslice.com/help/data-api/#listslices)

```javascript
apiClient.listSlices()
```

#### `getSliceBySlug(slug)`

- Retrieves metadata for the slice with slug `slug`.
- Soundslice documentation: ["Get slice"](https://www.soundslice.com/help/data-api/#getslice)

```javascript
apiClient.getSliceBySlug('123456')
```

#### `getSliceNotationBySlug(slug)`

- Retrieves the original notation file for the slice with slug `slug`.
- Soundslice documentation: ["Get slice’s notation"](https://www.soundslice.com/help/data-api/#getnotation)

```javascript
apiClient.getSliceNotationBySlug('123456')
```

#### `moveSliceToFolder()`

- Moves a slice to a folder.
- Soundslice documentation: ["Move slice to folder"](https://www.soundslice.com/help/data-api/#moveslice)

```javascript
apiClient.moveSliceToFolder({
  // Required - The slice's slug.
  slug: `123456`,

  // Required - The ID of the new folder.
  // Use 0 (zero) to move the slice to your account's root folder.
  folder_id: `2048`,

  // Optional - The ID of the user account to move this slice into.
  // This will only work for the ID of an organization you belong to.
  // If not provided, this value will default to the user you're accessing the
  // API with.
  user_id: 4,
})
```

#### `duplicateSliceByScorehash(scorehash)`

- Duplicates the slice with the scorehash `scorehash`.
- Soundslice documentation: ["Duplicate slice"](https://www.soundslice.com/help/data-api/#duplicateslice)

```javascript
apiClient.duplicateSliceByScorehash('C1FVc')
```

#### `getSliceRecordingsBySlug(slug)`

- Gets data about all recordings in the slice with slug `slug`.
- Soundslice documentation: ["Get slice’s recordings"](https://www.soundslice.com/help/data-api/#getrecordings)


```javascript
apiClient.getSliceRecordingsBySlug('123456')
```

#### `deleteRecordingByRecordingId(recordingId)`

- Deletes the recording with the given `recordingId`, including all its associated data such as syncpoints and uploaded audio.
- Soundslice documentation: ["Delete recording"](https://www.soundslice.com/help/data-api/#deleterecording)

```javascript
apiClient.deleteRecordingByRecordingId('123456')
```

#### `getSyncpointsByRecordingId(recordingId)`

- Gets the syncpoints for the recording with ID `recordingId`.
- Soundslice documentation: ["Get recording’s syncpoints"](https://www.soundslice.com/help/data-api/#getsyncpoints)


```javascript
apiClient.getSyncpointsByRecordingId('123456')
```

#### `createFolder()`

- Creates a folder.
- Soundslice documentation: ["Create folder"](https://www.soundslice.com/help/data-api/#createfolder)

```javascript
apiClient.createFolder({
  // Required - The name of the folder.
  name: 'New Example Folder',

  // Optional - Integer. The folder's parent ID.
  // Use this if you want to nest a folder within another one.
  parent_id: 12345,
})
```

#### `renameFolder()`

- Renames a folder.
- Soundslice documentation: ["Rename folder"](https://www.soundslice.com/help/data-api/#renamefolder)

```javascript
apiClient.renameFolder({
  // Required - The folder's ID.
  folderId: '12345',

  // Required - The new name of the folder.
  name: 'Renamed Folder',
})
```

#### `deleteFolderByFolderId(folderId)`

- Deletes the given folder within your account’s slice manager.
- The folder must be empty. It can’t contain any slices or other folders.
- Soundslice documentation: ["Delete folder"](https://www.soundslice.com/help/data-api/#deletefolder)

```javascript
apiClient.deleteFolderByFolderId('12345')
```

#### `listFolders()`

- Lists **top-level** folders within your account’s slice manager.
- Soundslice documentation: ["List folders"](https://www.soundslice.com/help/data-api/#listfolders)


```javascript
apiClient.listFolders()
```

#### `listSubfoldersByParentId(parentId)`

- List subfolders within a given parent folder.
- Soundslice documentation: ["List folders"](https://www.soundslice.com/help/data-api/#listfolders)


```javascript
apiClient.listSubfoldersByParentId('12345')
```

## Versioning

Until this package reaches a 1.0 release, breaking changes may be released.
