import ActionTypes from '../data/ActionTypes';
// import { post } from '../api/apiRequests';
// import ApiEnpoints from '../api/ApiEndpoints';
import requestDispatch from '../utils/requestDispatch';
import { openUrlInNewTab } from '../utils/windowHelper';

export function deleteWorkflowElement(index) {
  return {
    type: ActionTypes.DELETE_WORKFLOW_ELEMENT,
    payload: index,
  };
}

export function submitWorkflow() {
  return async (dispatch, getState) => {
    const { selectedWorkflowElements = [], workflowUrl } = getState().workflowState;
    let url = workflowUrl;

    // TODO: integrate this endpoint with the API.
    if (!url) {
      url = await dispatch(requestDispatch(
        ActionTypes.GET_AVAILABLE_WORKFLOW_ELEMENTS,
        // () => post(ApiEnpoints.WORKFLOW),
        async () => ({ url: 'https://google.com' }),
        selectedWorkflowElements,
      ));
    }

    openUrlInNewTab(url);
  };
}
