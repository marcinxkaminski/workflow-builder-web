import ActionTypes from '../data/ActionTypes';

export const initialState = {
  request: {
    status: null,
    error: null,
  },
  selectedWorkflowElements: [],
  inputData: null,
  resultData: null,
  url: null,
};

export default function workflowReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.ADD_WORKFLOW_ELEMENT:
      return Object.assign({}, state, {
        selectedWorkflowElements: state.selectedWorkflowElements.concat(payload), url: '',
      });

    case ActionTypes.DELETE_WORKFLOW_ELEMENT:
      return Object.assign({}, state, {
        selectedWorkflowElements: state.selectedWorkflowElements.filter((_, idx) => idx !== payload), url: '',
      });

    default:
      return state;
  }
}
