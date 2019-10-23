// import { get } from '../api/apiRequests';
// import ApiEnpoints from '../api/apiEndpoints';
import ActionTypes from '../data/ActionTypes';
import requestDispatch from '../utils/requestDispatch';

export function getAvailableWorkflowElements() {
  return requestDispatch(
    ActionTypes.GET_AVAILABLE_WORKFLOW_ELEMENTS,
    // () => get(ApiEnpoints.WORKFLOW_ELEMENTS),
    async () => [
      { name: 'FIRST', icon: '' },
      { name: 'SECOND', icon: '' },
      { name: 'THIRD', icon: '' },
      { name: 'FOURTH', icon: '' },
    ],
  );
}
