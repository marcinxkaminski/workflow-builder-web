import ActionTypes from '../data/ActionTypes';
import RequestStatuses from '../data/RequestStatuses';

const initialState = {
  request: {
    status: null,
    error: null,
  },
  availableWorkflowElements: null,
};

export default function appReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.GET_AVAILABLE_WORKFLOW_ELEMENTS:
      return Object.assign({}, state, {
        request: { status: RequestStatuses.PENDING, error: '' },
      });

    case ActionTypes.GET_AVAILABLE_WORKFLOW_ELEMENTS_SUCCESS:
      return Object.assign({}, state, {
        request: { status: RequestStatuses.SUCCESS, error: '' },
        availableWorkflowElements: payload,
      });

    case ActionTypes.GET_AVAILABLE_WORKFLOW_ELEMENTS_ERROR:
      return Object.assign({}, state, {
        request: { status: RequestStatuses.ERROR, error: payload },
      });

    default:
      return state;
  }
}
