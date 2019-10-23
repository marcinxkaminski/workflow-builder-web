import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import dropzoneState, { initialState as dropzoneInitialState } from './Dropzone/dropzoneReducer';
import selectorState, { initialState as selectorInitialState } from './Selector/selectorReducer';

const initialState = {
  dropzoneState: dropzoneInitialState,
  selectorState: selectorInitialState,
};

export default createStore(
  combineReducers({ dropzoneState, selectorState }),
  initialState,
  applyMiddleware(thunk),
);
