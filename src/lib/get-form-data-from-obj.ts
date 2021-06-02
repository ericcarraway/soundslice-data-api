import FormData from 'form-data';

// helper function to convert a plain JS object to "multipart/form-data"
// eslint-disable-next-line @typescript-eslint/ban-types
const getFormDataFromObj = function getFormDataFromObj(paramsObj: object) {
  const formData = new FormData();

  Object.entries(paramsObj).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
};

export { getFormDataFromObj };
