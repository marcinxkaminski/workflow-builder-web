/* global expect, describe, jest */
import { get } from '../api/apiRequests';
import * as ApiEndpoints from '../api/ApiEndpoints';
import { getAvailableWorkflowElementsFromApi } from './selectorHelper';

jest.mock('../api/ApiEndpoints', () => ({
  WORKFLOW_ELEMENTS: 'mocked-url',
}));
jest.mock('../api/apiRequests', () => ({
  get: jest.fn(async () => ({ elements: [{ id: 'mock-id', name: 'mock-element' }] })),
}));

describe('SELECTOR HELPER', () => {
  it('requests getting available workflow elements from API', async () => {
    const res = await getAvailableWorkflowElementsFromApi();
    expect(get).toHaveBeenCalledWith(ApiEndpoints.WORKFLOW_ELEMENTS);
    expect(res.length).toEqual(1);
  });
});
