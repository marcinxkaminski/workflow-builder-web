import ActionTypes from '../data/ActionTypes';

export const initialState = {
  request: {
    status: null,
    error: null,
  },
  selectedWorkflowElements: [],
  inputData: null,
  resultData: null,
};

export default function workflowReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.ADD_WORKFLOW_ELEMENT:
      return Object.assign({}, state, { selectedWorkflowElements: payload.data });

    default:
      return state;
  }
}
