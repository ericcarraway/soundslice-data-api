# soundslice-data-api

https://www.npmjs.com/package/@percuss.io/soundslice-data-api

> _Unofficial JavaScript client for the Soundslice data API_

Each method returns an Axios Promise.

### 1. Install

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

## Implemented Methods:

Currently, three methods are implemented:

| Method Name    | Soundslice Documentation |
|----------------|--------------------------|
| listSlices     | ["List slices"](https://www.soundslice.com/help/data-api/#listslices) |
| getSliceBySlug | ["Get slice"](https://www.soundslice.com/help/data-api/#getslice) |
| getSliceRecordingsBySlug | ["Get slice’s recordings"](https://www.soundslice.com/help/data-api/#getrecordings) |
| getSyncpointsByRecordingId | ["Get recording’s syncpoints"](https://www.soundslice.com/help/data-api/#getsyncpoints) |

---

## Method Usage

#### `listSlices()`

Retrieves metadata for all slices in your account.

```javascript
apiClient.listSlices()
```

#### `getSliceBySlug(slug)`

Retrieves metadata for the slice with slug `slug`.

```javascript
apiClient.getSliceBySlug('123456')
```

#### `getSliceRecordingsBySlug(slug)`

Gets data about all recordings in the slice with slug `slug`.

```javascript
apiClient.getSliceRecordingsBySlug('123456')
```

#### `getSyncpointsByRecordingId(recordingId)`

Sets the syncpoints for the recording with ID `recordingId`.

```javascript
apiClient.getSyncpointsByRecordingId('123456')
```
