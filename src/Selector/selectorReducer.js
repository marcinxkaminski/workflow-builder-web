import ActionTypes from '../data/ActionTypes';

export const initialState = {
  request: {
    status: null,
    error: null,
  },
  availableWorkflowElements: [],
};

export default function selectorReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.GET_AVAILABLE_WORKFLOW_ELEMENTS:
      return Object.assign({}, state, {
        request: { status: payload.status, error: '' },
      });

    case ActionTypes.GET_AVAILABLE_WORKFLOW_ELEMENTS_SUCCESS:
      return Object.assign({}, state, {
        request: { status: payload.status, error: '' },
        availableWorkflowElements: payload.data,
      });

    case ActionTypes.GET_AVAILABLE_WORKFLOW_ELEMENTS_ERROR:
      return Object.assign({}, state, {
        request: { status: payload.status, error: payload.error },
      });

    default:
      return state;
  }
}
