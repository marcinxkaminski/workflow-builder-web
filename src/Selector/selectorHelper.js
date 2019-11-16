import { get } from '../api/apiRequests';
import * as ApiEnpoints from '../api/ApiEndpoints';
import WorkflowElement from '../models/WorkflowElement';

export const getAvailableWorkflowElementsFromApi = async () => {
  const { elements } = await get(ApiEnpoints.WORKFLOW_ELEMENTS);
  return elements.map(e => new WorkflowElement(e));
};
