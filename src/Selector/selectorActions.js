// import { get } from '../api/apiRequests';
import ActionTypes from '../data/ActionTypes';
// import ApiEnpoints from '../api/apiEndpoints';
import requestDispatch from '../utils/requestDispatch';
import WorkflowElement from '../models/WorkflowElement';

export function getAvailableWorkflowElements() {
  // TODO: integrate this endpoint with the API.
  return requestDispatch(
    ActionTypes.GET_AVAILABLE_WORKFLOW_ELEMENTS,
    // () => get(ApiEnpoints.WORKFLOW_ELEMENTS),
    async () => [
      new WorkflowElement({
        id: 1, name: 'FILTER', description: 'Filters the signal and checks for vulnerabilities', materialIcon: 'search', config: {},
      }),
      new WorkflowElement({
        id: 2, name: 'NORMALIZE', description: 'Runs normalization process on the whole data', materialIcon: 'equalizer', config: {},
      }),
      new WorkflowElement({
        id: 3, name: 'START', description: 'Prints start message and params', materialIcon: 'play_arrow', config: {},
      }),
      new WorkflowElement({
        id: 4, name: 'END', description: 'Prints end message with execution time and params', materialIcon: 'exit_to_app', config: {},
      }),
    ],
  );
}

export function addWorkflowElement(item) {
  return {
    type: ActionTypes.ADD_WORKFLOW_ELEMENT,
    payload: item,
  };
}
