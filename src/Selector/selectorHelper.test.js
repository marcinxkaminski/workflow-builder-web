/* global expect, describe, jest */
import { get } from '../api/api-requests';
import * as ApiEndpoints from '../api/api-endpoints';
import { getAvailableWorkflowElementsFromApi } from './selectorHelper';

jest.mock('../api/api-endpoints', () => ({
  WORKFLOW_ELEMENTS: 'mocked-url',
}));
jest.mock('../api/api-requests', () => ({
  get: jest.fn(async () => ({ elements: [{ id: 'mock-id', name: 'mock-element' }] })),
}));

describe('SELECTOR HELPER', () => {
  it('requests getting available workflow elements from API', async () => {
    const res = await getAvailableWorkflowElementsFromApi();
    expect(get).toHaveBeenCalledWith(ApiEndpoints.WORKFLOW_ELEMENTS);
    expect(res.length).toEqual(1);
  });
});
