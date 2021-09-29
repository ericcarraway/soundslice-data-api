// examples/get-slice-notation-by-slug.js

// https://www.soundslice.com/help/data-api/#getnotation

const { apiClient, handleError, handleSuccess } = require(`./index.js`);

// change this to the slug of a slice you own
const slug = `696250`;

// returns an object with a single key: `url`
// this URL is a link to the original uploaded notation file
apiClient.getSliceNotationBySlug(slug).then(handleSuccess).catch(handleError);
