/* global expect, describe, jest */
import * as ActionTypes from '../data/ActionTypes';
import requestDispatch from '../utils/requestDispatch';

jest.mock('../utils/requestDispatch');
jest.mock('../data/ActionTypes', () => ({
  GET_AVAILABLE_WORKFLOW_ELEMENTS: 'mocked-action', ADD_WORKFLOW_ELEMENT: 'mocked-action2',
}));

describe('WORKFLOW ACTIONS', () => {
  it('', async () => {
    expect(true).toBe(true);
  });
});
