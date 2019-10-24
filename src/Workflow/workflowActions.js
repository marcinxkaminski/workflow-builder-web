import ActionTypes from '../data/ActionTypes';

export function deleteWorkflowElement(index) {
  return {
    type: ActionTypes.DELETE_WORKFLOW_ELEMENT,
    payload: { data: index },
  };
}
