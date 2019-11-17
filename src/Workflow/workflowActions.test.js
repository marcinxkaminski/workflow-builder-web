/* global expect, describe, jest */
import * as actions from './workflowActions';
import * as ActionTypes from '../data/ActionTypes';
import { post, put } from '../api/apiRequests';
import * as ApiEnpoints from '../api/ApiEndpoints';
import requestDispatch from '../utils/requestDispatch';
import { openUrlInNewTab } from '../utils/windowHelper';
import { buildUrl } from '../utils/urlHelper';

jest.mock('../utils/requestDispatch');
jest.mock('../utils/windowHelper', () => ({ openUrlInNewTab: jest.fn() }));
jest.mock('../api/apiRequests', () => ({ post: jest.fn(), put: jest.fn(async () => 'mock-result') }));
jest.mock('../utils/urlHelper', () => ({ buildUrl: jest.fn((...params) => params[2]) }));
jest.mock('../data/ActionTypes', () => ({
  GET_AVAILABLE_WORKFLOW_ELEMENTS: 'GET_AVAILABLE_WORKFLOW_ELEMENTS', ADD_WORKFLOW_ELEMENT: 'ADD_WORKFLOW_ELEMENT',
}));

jest.mock('../api/ApiEndpoints', () => ({
  WORKFLOW_ELEMENTS: 'WORKFLOW_ELEMENTS', BASE_API_URL: 'BASE_API_URL', WORKFLOW_FILES: 'WORKFLOW_FILES',
}));

describe('WORKFLOW ACTIONS', () => {
  it('transforms selected elements for submit', async () => {
    const mockItems = [{ id: 'id1', name: 'name1' }, { id: 'id1', name: 'name1' }, { id: 'id1', name: 'name1' }];
    const mockItemsIds = mockItems.map(i => ({ id: i.id }));

    expect(actions.transformSelectedWorkflowElementsForSubmit(mockItems)).toEqual(mockItemsIds);
  });

  it('validates data to get result and returns info that it is valid', async () => {
    const mockData = JSON.stringify({ some: 'mock' });
    const mockConfig = { data: { some: 'mock' } };
    expect(actions.validateDataToGetResult(mockData, mockConfig)).toBe(true);
  });

  it('validates data to get result and returns info that it invalid', async () => {
    const mockData = JSON.stringify({ someother: 'mock' });
    const mockConfig = { data: { some: 'mock' } };
    expect(actions.validateDataToGetResult(mockData, mockConfig)).toBe(false);

    const mockData2 = JSON.stringify({ some: 'mock' });
    const mockConfig2 = { data: { some: 'mock', some2: 'mock' } };
    expect(actions.validateDataToGetResult(mockData2, mockConfig2)).toBe(false);
  });

  it('gets action object for deleting workflow element', async () => {
    const mockItem = { index: 5, id: 'id1', name: 'name1' };

    const expectedAction = { type: ActionTypes.DELETE_WORKFLOW_ELEMENT, payload: mockItem.index };

    expect(actions.deleteWorkflowElement(mockItem)).toEqual(expectedAction);
  });

  it('sends request for processing online', async () => {
    const mockData = { some: 'mock' };
    const mockItem = { id: 0, name: 'mock-name', config: { data: { some: 'mocked' } } };
    actions.validateDataToGetResult = jest.fn(() => true);

    const res = await actions.processOnlineInApi(JSON.stringify(mockData), mockItem);
    expect(put).toHaveBeenCalledWith(ApiEnpoints.WORKFLOW_ELEMENTS, { id: mockItem.id, data: mockData });
    expect(res).toEqual({ index: mockItem.index, result: 'mock-result', isValid: true });
  });

  it('dispatches request for online processing', async () => {
    const mockData = { some: 'mock' };
    const mockItem = { id: 0, name: 'mock-name', config: { data: { some: 'mocked' } } };
    actions.processOnlineInApi = jest.fn();

    actions.onlineProcessing(mockItem, JSON.stringify(mockData));
    expect(requestDispatch).toHaveBeenCalledTimes(1);
  });

  it('submits workflow', async () => {
    const mockItems = [{ id: 'mock-id', name: 'mock-name', config: { data: { some: 'mock' } } }];
    const mockWorkflowId = 'mock-id';
    const mockDispatch = jest.fn();
    const mockGetState = jest.fn(() => ({ selectedWorkflowElements: mockItems, workflowId: mockWorkflowId }));

    // TODO: finish it
    // actions.transformSelectedWorkflowElementsForSubmit = jest.fn();
    // actions.submitWorkflow()(mockDispatch, mockGetState);
  });
});
