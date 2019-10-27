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
        id: 1, name: 'FIRST', description: 'this is exemplary item description', materialIcon: 'build', config: {},
      }),
      new WorkflowElement({
        id: 2, name: 'SECOND', description: 'this is exemplary item description', materialIcon: 'alarm_on', config: {},
      }),
      new WorkflowElement({
        id: 3, name: 'THIRD', description: 'this is exemplary item description', materialIcon: 'all_inbox', config: {},
      }),
      new WorkflowElement({
        id: 4, name: 'FOURTH', description: 'this is exemplary item description', materialIcon: 'android', config: {},
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
