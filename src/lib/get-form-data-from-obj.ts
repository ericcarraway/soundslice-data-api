import FormData from 'form-data';

/** helper function to convert a plain JS object to "multipart/form-data" */
const getFormDataFromObj = function getFormDataFromObj(
  paramsObj: Record<string, unknown>,
): FormData {
  const formData = new FormData();

  Object.entries(paramsObj).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
};

export { getFormDataFromObj };
