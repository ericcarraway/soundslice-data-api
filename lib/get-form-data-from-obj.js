const FormData = require(`form-data`);

// helper function to convert a plain JS object to form data
const getFormDataFromObj = function getFormDataFromObj(paramsObj) {
  const formData = new FormData();

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(paramsObj)) {
    formData.append(key, value);
  }

  return formData;
};

module.exports = { getFormDataFromObj };
