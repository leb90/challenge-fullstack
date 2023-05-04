import axios from "axios";

export const GET_FILES_REQUEST = "GET_FILES_REQUEST";
export const GET_FILES_SUCCESS = "GET_FILES_SUCCESS";
export const GET_FILES_FAILURE = "GET_FILES_FAILURE";

const apiUrl = process.env.API_URL;

export const getFilesRequest = () => {
  return {
    type: GET_FILES_REQUEST,
  };
};

export const getFilesSuccess = (files) => {
  return {
    type: GET_FILES_SUCCESS,
    payload: files,
  };
};

export const getFilesFailure = (error) => {
  return {
    type: GET_FILES_FAILURE,
    payload: error,
  };
};

export const getFiles = (fileName) => {

  return (dispatch) => {
    dispatch(getFilesRequest());
    axios
      .get(
        `${apiUrl}/files/data${fileName ? `?fileName=${fileName}` : ""}`
      )
      .then((response) => {
        const files = response.data;
        dispatch(getFilesSuccess(files));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(getFilesFailure(errorMsg));
      });
  };
};
