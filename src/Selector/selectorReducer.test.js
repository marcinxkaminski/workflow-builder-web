/* global expect, describe, jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as ActionTypes from '../data/ActionTypes';
import reducer, { initialState } from './selectorReducer';


jest.mock('../data/ActionTypes', () => ({
  GET_AVAILABLE_WORKFLOW_ELEMENTS: 'GET_AVAILABLE_WORKFLOW_ELEMENTS',
  GET_AVAILABLE_WORKFLOW_ELEMENTS_SUCCESS: 'GET_AVAILABLE_WORKFLOW_ELEMENTS_SUCCESS',
  GET_AVAILABLE_WORKFLOW_ELEMENTS_ERROR: 'GET_AVAILABLE_WORKFLOW_ELEMENTS_ERROR',
}));

describe('SELECTOR REDUCER', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  let store = null;

  beforeEach(() => {
    store = mockStore();
  });

  it('has initial state', async () => {
    expect(!!Object.keys(initialState).length).toBe(true);
  });

  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('dispatches GET_AVAILABLE_WORKFLOW_ELEMENTS and changes request status', async () => {
    const mockStatus = 'mock-status';

    const actionToDispatch = { type: ActionTypes.GET_AVAILABLE_WORKFLOW_ELEMENTS, payload: { status: mockStatus } };
    const expectedActions = [actionToDispatch];
    const expectedState = { ...initialState, request: { status: mockStatus, error: null } };

    await store.dispatch(actionToDispatch);

    expect(store.getActions()).toEqual(expectedActions);
    expect(reducer(initialState, actionToDispatch)).toEqual(expectedState);
  });

  it('dispatches GET_AVAILABLE_WORKFLOW_ELEMENTS_SUCCESS and changes request status', async () => {
    const mockStatus = 'mock-status';
    const mockData = [{ some: 'mock' }];

    const actionToDispatch = {
      type: ActionTypes.GET_AVAILABLE_WORKFLOW_ELEMENTS_SUCCESS,
      payload: { status: mockStatus, data: mockData },
    };
    const expectedActions = [actionToDispatch];
    const expectedState = {
      ...initialState,
      request: { status: mockStatus, error: null },
      availableWorkflowElements: mockData,
    };

    await store.dispatch(actionToDispatch);

    expect(store.getActions()).toEqual(expectedActions);
    expect(reducer(initialState, actionToDispatch)).toEqual(expectedState);
  });

  it('dispatches GET_AVAILABLE_WORKFLOW_ELEMENTS_ERROR and changes request status', async () => {
    const mockStatus = 'mock-status';
    const mockError = 'mock-some-error';

    const actionToDispatch = {
      type: ActionTypes.GET_AVAILABLE_WORKFLOW_ELEMENTS_ERROR,
      payload: { status: mockStatus, error: mockError },
    };
    const expectedActions = [actionToDispatch];
    const expectedState = { ...initialState, request: { status: mockStatus, error: mockError } };

    await store.dispatch(actionToDispatch);

    expect(store.getActions()).toEqual(expectedActions);
    expect(reducer(initialState, actionToDispatch)).toEqual(expectedState);
  });
});
