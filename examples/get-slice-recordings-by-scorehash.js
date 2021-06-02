// examples/get-slice-recordings-by-scorehash.js

// https://www.soundslice.com/help/data-api/#getrecordings

const { apiClient, handleError, handleSuccess } = require(`./index.js`);

// change this to the scorehash of a slice you own
const scorehash = `HD8Nc`;

apiClient
  .getSliceRecordingsByScorehash(scorehash)
  .then(handleSuccess)
  .catch(handleError);

// the Soundslice API returns an array of "recording" objects

// [
//   {
//     id: 42413,
//     name: 'Lunchtime Groove',
//     cropped_duration: 60,
//     source: 4,
//     source_data: '',
//     hls_url: '',
//     syncpoint_count: 141,
//     status: 'ready'
//   }
// ]
