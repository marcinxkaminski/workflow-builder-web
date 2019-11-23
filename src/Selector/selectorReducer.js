import * as ActionTypes from '../data/ActionTypes';

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
      return { ...state, request: { status: payload.status, error: null } };

    case ActionTypes.GET_AVAILABLE_WORKFLOW_ELEMENTS_SUCCESS:
      return {
        ...state,
        request: { status: payload.status, error: null },
        availableWorkflowElements: payload.data,
      };

    case ActionTypes.GET_AVAILABLE_WORKFLOW_ELEMENTS_ERROR:
      return { ...state, request: { status: payload.status, error: payload.error } };

    default:
      return state;
  }
}
