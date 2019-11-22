import { get } from '../api/api-requests';
import * as ApiEnpoints from '../api/api-endpoints';
import WorkflowElement from '../models/WorkflowElement';

export const getAvailableWorkflowElementsFromApi = async () => {
  const { elements } = await get(ApiEnpoints.WORKFLOW_ELEMENTS);
  return elements.map(e => new WorkflowElement(e));
};
