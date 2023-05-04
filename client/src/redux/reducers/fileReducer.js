import {
    GET_FILES_REQUEST,
    GET_FILES_SUCCESS,
    GET_FILES_FAILURE,
  } from '../actions/fileActions';
  
  const initialState = {
    loading: false,
    files: [],
    error: '',
  };
  
  const fileReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_FILES_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_FILES_SUCCESS:
        return {
          loading: false,
          files: action.payload,
          error: '',
        };
      case GET_FILES_FAILURE:
        return {
          loading: false,
          files: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default fileReducer;
  