import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import appState from './App/appReducer';
import dropzoneState from './Dropzone/dropzoneReducer';
import selectorState from './Selector/selectorReducer';

const initialState = {
  appState: {},
  dropzoneState: {},
  selectorState: {},
};

export default createStore(
  combineReducers({ appState, dropzoneState, selectorState }),
  initialState,
  applyMiddleware(thunk),
);
