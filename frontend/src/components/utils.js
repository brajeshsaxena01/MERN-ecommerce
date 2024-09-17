export const getError = (error) => {
  // console.log("err", error.response.data.message);
  return error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message;
};
