import * as ActionTypes from '../data/ActionTypes';

export const initialState = {
  request: {
    status: null,
    error: null,
  },
  selectedWorkflowElements: [],
  workflowId: null,
};

export default function workflowReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.ADD_WORKFLOW_ELEMENT:
      return Object.assign({}, state, {
        selectedWorkflowElements: state.selectedWorkflowElements.concat(payload), workflowId: null,
      });

    case ActionTypes.DELETE_WORKFLOW_ELEMENT:
      return Object.assign({}, state, {
        selectedWorkflowElements: state.selectedWorkflowElements.filter((_, idx) => idx !== payload), workflowId: null,
      });

    case ActionTypes.GET_RESULTS_FOR_DATA_SUCCESS:
      return Object.assign({}, state, {
        request: {
          status: payload.status,
          error: payload.error,
        },
        selectedWorkflowElements: state.selectedWorkflowElements.map((e, idx) => {
          if (idx === payload.data.index && e.config) {
            e.config.result = payload.data.result;
            e.config.isValid = payload.data.isValid;
          }
          return e;
        }),
      });

    case ActionTypes.GET_RESULTS_FOR_DATA:
    case ActionTypes.GET_RESULTS_FOR_DATA_ERROR:
    case ActionTypes.SUBMIT_WORKFLOW:
    case ActionTypes.SUBMIT_WORKFLOW_ERROR:
      return Object.assign({}, state, {
        request: {
          status: payload.status,
          error: payload.error,
        },
      });

    case ActionTypes.SUBMIT_WORKFLOW_SUCCESS:
      return Object.assign({}, state, {
        request: {
          status: payload.status,
          error: payload.error,
        },
        workflowId: payload.data.id,
      });

    default:
      return state;
  }
}
