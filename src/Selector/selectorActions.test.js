/* global expect, describe, jest */
import * as actions from './selectorActions';
import requestDispatch from '../utils/requestDispatch';

jest.mock('../utils/requestDispatch');
jest.mock('../data/ActionTypes');
jest.mock('../api/ApiEndpoints');
jest.mock('../models/WorkflowElement');
jest.mock('../api/apiRequests', () => ({ get: jest.fn().mockImplementation(() => '') }));

describe('SELECTOR ACTIONS', () => {
  it('calls request dispatch with get available workflow elements action to dispatch and func to await', async () => {
    // expect(false).toEqual(true);
  });

  it('returns add workflow element action to dispatch', async () => {
    // expect(false).toEqual(true);
  });
});
