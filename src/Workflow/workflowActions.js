import * as ActionTypes from '../data/ActionTypes';
import { post, put } from '../api/apiRequests';
import * as ApiEnpoints from '../api/ApiEndpoints';
import requestDispatch from '../utils/requestDispatch';
import { openUrlInNewTab } from '../utils/windowHelper';

export function transformSelectedWorkglowElementsForSubmit(elements) {
  return elements.map(({ id }) => ({ id }));
}

export function validateDataToGetResult(data, config) {
  try {
    const dataObj = JSON.parse(data);
    const emptyValuesCount = Object.values(dataObj).filter(i => !i).length;
    const notSameKeysCount = Object.keys(config.data).filter(k => !Object.keys(dataObj).includes(k)).length;
    return !notSameKeysCount && !emptyValuesCount;
  } catch (err) {
    console.warn(err);
    return false;
  }
}

export function deleteWorkflowElement(item) {
  return {
    type: ActionTypes.DELETE_WORKFLOW_ELEMENT,
    payload: item.index,
  };
}

export function onlineProcessing(item, data) {
  return requestDispatch(
    ActionTypes.GET_RESULTS_FOR_DATA,
    async () => {
      let result = null;
      const isValid = validateDataToGetResult(data, item.config);
      if (isValid) {
        result = await put(ApiEnpoints.WORKFLOW_ELEMENTS, { id: item.id, data: JSON.parse(data) });
      }
      return { index: item.index, result, isValid };
    },
  );
}

export function submitWorkflow() {
  return async (dispatch, getState) => {
    const { selectedWorkflowElements = [], workflowId } = getState().workflowState;
    let finalId = workflowId;

    if (!finalId) {
      const elements = transformSelectedWorkglowElementsForSubmit(selectedWorkflowElements);
      finalId = await dispatch(requestDispatch(
        ActionTypes.SUBMIT_WORKFLOW,
        async () => {
          const { id } = await post(ApiEnpoints.WORKFLOW_ELEMENTS, { elements });
          return id;
        },
      ));
    }

    openUrlInNewTab(`${ApiEnpoints.BASE_API_URL}${ApiEnpoints.WORKFLOW_FILES}?id=${finalId}`);
  };
}
