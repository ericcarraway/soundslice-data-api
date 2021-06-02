// examples/get-slice-recordings-by-slug.js

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { apiClient, handleError, handleSuccess } = require(`./index.js`);

// change this to the slug of a slice you own
const slug = `489974`;

// NOTE: `getSliceRecordingsBySlug` is deprecated
//        in favor of `getSliceRecordingsByScorehash`
apiClient.getSliceRecordingsBySlug(slug).then(handleSuccess).catch(handleError);
