import * as ActionTypes from '../data/ActionTypes';
import requestDispatch from '../utils/requestDispatch';
import { getAvailableWorkflowElementsFromApi } from './selectorHelper';


export function getAvailableWorkflowElements() {
  return requestDispatch(
    ActionTypes.GET_AVAILABLE_WORKFLOW_ELEMENTS,
    getAvailableWorkflowElementsFromApi,
  );
}

export function addWorkflowElement(item) {
  return {
    type: ActionTypes.ADD_WORKFLOW_ELEMENT,
    payload: { ...item },
  };
}
