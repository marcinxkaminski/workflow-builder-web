/* global expect, describe, jest */
import * as actions from './workflowActions';
import * as ActionTypes from '../data/ActionTypes';
import { post, put } from '../api/apiRequests';
import * as ApiEnpoints from '../api/apiEndpoints';
import requestDispatch from '../utils/requestDispatch';
import { openUrlInNewTab } from '../utils/windowHelper';
import { buildUrl } from '../utils/urlHelper';

jest.mock('../utils/requestDispatch', () => jest.fn());
jest.mock('../utils/windowHelper', () => ({ openUrlInNewTab: jest.fn() }));
jest.mock('../api/apiRequests', () => ({
  post: jest.fn(async () => ({ id: 'mock-workflow-id' })),
  put: jest.fn(async () => 'mock-result'),
}));
jest.mock('../utils/urlHelper', () => ({ buildUrl: jest.fn((...params) => params[2].id) }));
jest.mock('../data/ActionTypes', () => ({
  GET_AVAILABLE_WORKFLOW_ELEMENTS: 'GET_AVAILABLE_WORKFLOW_ELEMENTS', ADD_WORKFLOW_ELEMENT: 'ADD_WORKFLOW_ELEMENT',
}));

jest.mock('../api/apiEndpoints', () => ({
  WORKFLOW_ELEMENTS: 'WORKFLOW_ELEMENTS', BASE_API_URL: 'BASE_API_URL', WORKFLOW_FILES: 'WORKFLOW_FILES',
}));

describe('WORKFLOW ACTIONS', () => {
  beforeEach(() => {
    requestDispatch.mockClear();
    openUrlInNewTab.mockClear();
    buildUrl.mockClear();
    post.mockClear();
    put.mockClear();
  });

  it('transforms selected elements for submit', async () => {
    const mockItems = [{ id: 'id1', name: 'name1' }, { id: 'id1', name: 'name1' }, { id: 'id1', name: 'name1' }];
    const mockItemsIds = mockItems.map(i => ({ id: i.id }));

    expect(actions.transformSelectedWorkflowElementsForSubmit(mockItems)).toEqual(mockItemsIds);
    expect(actions.transformSelectedWorkflowElementsForSubmit()).toEqual([]);
  });

  it('validates data to get result and throws error', async () => {
    const mockData = null;
    const mockConfig = { data: { some: 'mock' } };

    console.warn = jest.fn();
    expect(actions.validateDataToGetResult(mockData, mockConfig)).toBe(false);
    expect(console.warn).toHaveBeenCalledTimes(1);
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

    const res = await actions.processOnlineInApi({ data: JSON.stringify(mockData), item: mockItem });
    expect(put).toHaveBeenCalledWith(ApiEnpoints.WORKFLOW_ELEMENTS, { id: mockItem.id, data: mockData });
    expect(res).toEqual({ index: mockItem.index, result: 'mock-result', isValid: true });
  });

  it('doesn\'t send request for processing online cause data is invalid', async () => {
    const mockData = { some: 'mock' };
    const mockItem = { id: 0, name: 'mock-name', config: { data: { some: 'mocked', additional: 'invalid' } } };
    actions.validateDataToGetResult = jest.fn(() => false);

    const res = await actions.processOnlineInApi({ data: JSON.stringify(mockData), item: mockItem });
    expect(put).not.toBeCalled();
    expect(res).toEqual({ index: mockItem.index, result: null, isValid: false });
  });


  it('dispatches request for online processing', async () => {
    const mockData = { some: 'mock' };
    const mockItem = { id: 0, name: 'mock-name', config: { data: { some: 'mocked' } } };

    actions.onlineProcessing(mockItem, JSON.stringify(mockData));
    expect(requestDispatch).toHaveBeenCalledWith(
      ActionTypes.GET_RESULTS_FOR_DATA,
      actions.processOnlineInApi,
      { data: JSON.stringify(mockData), item: mockItem },
    );
  });

  it('sends request to submit workflow in API and gets id of created workflow', async () => {
    const mockItems = [{ id: 'mock-id', name: 'mock-name' }, { id: 'mock-id2', name: 'mock-name2' }];

    actions.submitWorkflowInApi({ elements: mockItems });

    expect(post).toHaveBeenCalledWith(ApiEnpoints.WORKFLOW_ELEMENTS, { elements: mockItems });
  });

  it('submits workflow when worklfow id is not set', async () => {
    const mockItems = [{ id: 'mock-id', name: 'mock-name', config: { data: { some: 'mock' } } }];
    const transformedItems = mockItems.map(i => ({ id: i.id }));
    const mockWorkflowId = 'mocked-workflow-id';
    const mockDispatch = jest.fn(async () => mockWorkflowId);
    const mockGetState = jest.fn(() => ({
      workflowState: { selectedWorkflowElements: mockItems, workflowId: null },
    }));

    await actions.submitWorkflow()(mockDispatch, mockGetState);

    expect(requestDispatch).toHaveBeenCalledWith(
      ActionTypes.SUBMIT_WORKFLOW,
      actions.submitWorkflowInApi,
      { elements: transformedItems },
    );
    expect(buildUrl).toHaveBeenCalledWith(ApiEnpoints.BASE_API_URL, ApiEnpoints.WORKFLOW_FILES, { id: mockWorkflowId });
    expect(openUrlInNewTab).toHaveBeenCalledWith(mockWorkflowId);
  });

  it('submits workflow when worklfow id is set and immediately opens new window', async () => {
    const mockItems = [{ id: 'mock-id', name: 'mock-name', config: { data: { some: 'mock' } } }];
    const mockWorkflowId = 'mock-wf-id';
    const mockDispatch = jest.fn();
    const mockGetState = jest.fn(() => ({
      workflowState: { selectedWorkflowElements: mockItems, workflowId: mockWorkflowId },
    }));

    actions.transformSelectedWorkflowElementsForSubmit = jest.fn();
    await actions.submitWorkflow()(mockDispatch, mockGetState);

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(buildUrl).toHaveBeenCalledWith(ApiEnpoints.BASE_API_URL, ApiEnpoints.WORKFLOW_FILES, { id: 'mock-wf-id' });
    expect(openUrlInNewTab).toHaveBeenCalledWith(mockWorkflowId);
  });
});
