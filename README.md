# soundslice-data-api

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

const apiClient = require("@percuss.io/soundslice-data-api")({
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

- `listSlices`: [List slices](https://www.soundslice.com/help/data-api/#listslices)
