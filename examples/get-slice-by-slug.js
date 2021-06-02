// examples/get-slice-by-slug.js

// https://www.soundslice.com/help/data-api/#getslice

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { apiClient, handleError, handleSuccess } = require(`./index.js`);

// change this to the slug of a slice you own
const slug = `33244`;

apiClient.getSliceBySlug(slug).then(handleSuccess).catch(handleError);
