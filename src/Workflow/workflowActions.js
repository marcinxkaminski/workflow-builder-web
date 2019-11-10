import ActionTypes from '../data/ActionTypes';
import { post } from '../api/apiRequests';
import * as ApiEnpoints from '../api/ApiEndpoints';
import requestDispatch from '../utils/requestDispatch';
import { openUrlInNewTab } from '../utils/windowHelper';

export function deleteWorkflowElement(index) {
  return {
    type: ActionTypes.DELETE_WORKFLOW_ELEMENT,
    payload: index,
  };
}

export function onlineProcessing(item) {
  console.log(item);
}

export function submitWorkflow() {
  return async (dispatch, getState) => {
    const { selectedWorkflowElements: elements = [], workflowId } = getState().workflowState;
    let finalId = workflowId;

    if (!finalId) {
      finalId = await dispatch(requestDispatch(
        ActionTypes.SUBMIT_WORKFLOW,
        async () => {
          const { id } = await post(ApiEnpoints.WORKFLOW_ELEMENTS, { elements });
          return id;
        },
      ));
    }
    console.log(`${ApiEnpoints.BASE_API_URL}${ApiEnpoints.WORKFLOW_FILES}?id=${finalId}`);

    openUrlInNewTab(`${ApiEnpoints.BASE_API_URL}${ApiEnpoints.WORKFLOW_FILES}?id=${finalId}`);
  };
}
