import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import workflowState, { initialState as workflowInitialState } from './workflow/workflowReducer';
import selectorState, { initialState as selectorInitialState } from './selector/selectorReducer';

const initialState = {
  workflowState: workflowInitialState,
  selectorState: selectorInitialState,
};

export default createStore(
  combineReducers({ workflowState, selectorState }),
  initialState,
  applyMiddleware(thunk),
);
