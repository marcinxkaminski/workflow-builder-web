import { get } from '../api/apiRequests';
import * as ActionTypes from '../data/ActionTypes';
import * as ApiEnpoints from '../api/ApiEndpoints';
import requestDispatch from '../utils/requestDispatch';
import WorkflowElement from '../models/WorkflowElement';

export function getAvailableWorkflowElements() {
  return requestDispatch(
    ActionTypes.GET_AVAILABLE_WORKFLOW_ELEMENTS,
    async () => {
      const { elements } = await get(ApiEnpoints.WORKFLOW_ELEMENTS);
      return elements.map(e => new WorkflowElement(e));
    },
  );
}

export function addWorkflowElement(item) {
  const element = item;
  return {
    type: ActionTypes.ADD_WORKFLOW_ELEMENT,
    payload: element,
  };
}
