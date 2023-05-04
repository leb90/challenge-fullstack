import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import fileReducer from './redux/reducers/fileReducer';

const store = configureStore({
  reducer: {
    fileReducer: fileReducer,
  },
  middleware: [thunk],
});

export default store;
