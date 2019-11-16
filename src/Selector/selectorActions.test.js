/* global expect, describe, jest */
import * as actions from './selectorActions';
import * as ActionTypes from '../data/ActionTypes';
import requestDispatch from '../utils/requestDispatch';
import { getAvailableWorkflowElementsFromApi } from './selectorHelper';

jest.mock('../utils/requestDispatch');
jest.mock('../data/ActionTypes', () => ({
  GET_AVAILABLE_WORKFLOW_ELEMENTS: 'mocked-action', ADD_WORKFLOW_ELEMENT: 'mocked-action2',
}));
jest.mock('./selectorHelper', () => ({ getAvailableWorkflowElementsFromApi: jest.fn().mockImplementation(() => '') }));

describe('SELECTOR ACTIONS', () => {
  it('calls request dispatch with get available workflow elements action to dispatch and func to await', async () => {
    actions.getAvailableWorkflowElements();
    expect(requestDispatch).toHaveBeenCalledWith(
      ActionTypes.GET_AVAILABLE_WORKFLOW_ELEMENTS, getAvailableWorkflowElementsFromApi,
    );
  });

  it('returns add workflow element action to dispatch', async () => {
    const mockItem = { some: 'mock' };
    const action = actions.addWorkflowElement(mockItem);
    expect(action).toEqual({
      type: ActionTypes.ADD_WORKFLOW_ELEMENT,
      payload: mockItem,
    });
  });
});
