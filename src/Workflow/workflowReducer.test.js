/* global expect, describe, jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as ActionTypes from '../data/ActionTypes';
import reducer, { initialState } from './workflowReducer';

jest.mock('../data/ActionTypes', () => ({
  ADD_WORKFLOW_ELEMENT: 'ADD_WORKFLOW_ELEMENT',
  DELETE_WORKFLOW_ELEMENT: 'mock-action-success',
  GET_RESULTS_FOR_DATA_SUCCESS: 'mock-action-error',
  GET_RESULTS_FOR_DATA: 'GET_RESULTS_FOR_DATA',
  GET_RESULTS_FOR_DATA_ERROR: 'GET_RESULTS_FOR_DATA_ERROR',
  SUBMIT_WORKFLOW: 'SUBMIT_WORKFLOW',
  SUBMIT_WORKFLOW_ERROR: 'SUBMIT_WORKFLOW_ERROR',
  SUBMIT_WORKFLOW_SUCCESS: 'SUBMIT_WORKFLOW_SUCCESS',
}));

describe('WORKFLOW REDUCER', () => {
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

  it('dispatches ADD_WORKFLOW_ELEMENT and changes selected workflow elements array', async () => {
    const mockItem = { some: 'mock' };

    const actionToDispatch = { type: ActionTypes.ADD_WORKFLOW_ELEMENT, payload: mockItem };
    const expectedActions = [actionToDispatch];
    const expectedState = { ...initialState, selectedWorkflowElements: [mockItem] };

    await store.dispatch(actionToDispatch);

    expect(store.getActions()).toEqual(expectedActions);
    expect(reducer(initialState, actionToDispatch)).toEqual(expectedState);
  });

  it('dispatches DELETE_WORKFLOW_ELEMENT and changes selected workflow elements array', async () => {
    const mockItem = { some: 'mock' };
    const mockIndex = 0;

    const actionToDispatch = { type: ActionTypes.DELETE_WORKFLOW_ELEMENT, payload: mockIndex };
    const expectedActions = [actionToDispatch];
    const expectedState = { ...initialState, selectedWorkflowElements: [] };

    await store.dispatch(actionToDispatch);

    const state = { ...initialState, selectedWorkflowElements: [mockItem] };
    expect(store.getActions()).toEqual(expectedActions);
    expect(reducer(state, actionToDispatch)).toEqual(expectedState);
  });

  it('dispatches GET_RESULTS_FOR_DATA_SUCCESS and changes selected workflow elements array', async () => {
    const mockItem = { some: 'mock', config: {} };
    const mockIndex = 0;
    const mockIsValid = true;
    const mockResult = { some: 'mock' };
    const mockStatus = 'mock-stauts';
    const mockError = null;

    const actionToDispatch = {
      type: ActionTypes.GET_RESULTS_FOR_DATA_SUCCESS,
      payload: {
        data: { index: mockIndex, isValid: mockIsValid, result: mockResult },
        status: mockStatus,
        error: mockError,
      },
    };

    const expectedActions = [actionToDispatch];
    const expectedState = {
      ...initialState,
      request: { status: mockStatus, error: mockError },
      selectedWorkflowElements: [{ ...mockItem, config: { isValid: mockIsValid, result: mockResult } }],
    };

    await store.dispatch(actionToDispatch);

    const state = { ...initialState, selectedWorkflowElements: [mockItem] };
    expect(store.getActions()).toEqual(expectedActions);
    expect(reducer(state, actionToDispatch)).toEqual(expectedState);
  });

  it('dispatches GET_RESULTS_FOR_DATA_SUCCESS but doesnt save it cause of no index in arrat', async () => {
    const mockItem = { some: 'mock', config: {} };
    const mockIndex = 1;
    const mockIsValid = true;
    const mockResult = { some: 'mock' };
    const mockStatus = 'mock-stauts';
    const mockError = null;

    const actionToDispatch = {
      type: ActionTypes.GET_RESULTS_FOR_DATA_SUCCESS,
      payload: {
        data: { index: mockIndex, isValid: mockIsValid, result: mockResult },
        status: mockStatus,
        error: mockError,
      },
    };

    const expectedActions = [actionToDispatch];
    const expectedState = {
      ...initialState,
      request: { status: mockStatus, error: mockError },
      selectedWorkflowElements: [mockItem],
    };

    await store.dispatch(actionToDispatch);

    const state = { ...initialState, selectedWorkflowElements: [mockItem] };
    expect(store.getActions()).toEqual(expectedActions);
    expect(reducer(state, actionToDispatch)).toEqual(expectedState);
  });

  it('dispatches GET_RESULTS_FOR_DATA and changes request object', async () => {
    const mockStatus = 'mock-stauts';
    const mockError = null;

    const actionToDispatch = {
      type: ActionTypes.GET_RESULTS_FOR_DATA,
      payload: {
        status: mockStatus,
        error: mockError,
      },
    };
    const expectedActions = [actionToDispatch];
    const expectedState = { ...initialState, request: { status: mockStatus, error: mockError } };

    await store.dispatch(actionToDispatch);

    expect(store.getActions()).toEqual(expectedActions);
    expect(reducer(initialState, actionToDispatch)).toEqual(expectedState);
  });

  it('dispatches GET_RESULTS_FOR_DATA_ERROR and changes request object', async () => {
    const mockStatus = 'mock-stauts';
    const mockError = 'some-error';

    const actionToDispatch = {
      type: ActionTypes.GET_RESULTS_FOR_DATA_ERROR,
      payload: {
        status: mockStatus,
        error: mockError,
      },
    };
    const expectedActions = [actionToDispatch];
    const expectedState = { ...initialState, request: { status: mockStatus, error: mockError } };

    await store.dispatch(actionToDispatch);

    expect(store.getActions()).toEqual(expectedActions);
    expect(reducer(initialState, actionToDispatch)).toEqual(expectedState);
  });

  it('dispatches SUBMIT_WORKFLOW and changes request object', async () => {
    const mockStatus = 'mock-stauts';
    const mockError = null;

    const actionToDispatch = {
      type: ActionTypes.SUBMIT_WORKFLOW,
      payload: {
        status: mockStatus,
        error: mockError,
      },
    };
    const expectedActions = [actionToDispatch];
    const expectedState = { ...initialState, request: { status: mockStatus, error: mockError } };

    await store.dispatch(actionToDispatch);

    expect(store.getActions()).toEqual(expectedActions);
    expect(reducer(initialState, actionToDispatch)).toEqual(expectedState);
  });

  it('dispatches SUBMIT_WORKFLOW_ERROR and changes request object', async () => {
    const mockStatus = 'mock-stauts';
    const mockError = 'some-error';

    const actionToDispatch = {
      type: ActionTypes.SUBMIT_WORKFLOW_ERROR,
      payload: {
        status: mockStatus,
        error: mockError,
      },
    };
    const expectedActions = [actionToDispatch];
    const expectedState = { ...initialState, request: { status: mockStatus, error: mockError } };

    await store.dispatch(actionToDispatch);

    expect(store.getActions()).toEqual(expectedActions);
    expect(reducer(initialState, actionToDispatch)).toEqual(expectedState);
  });

  it('dispatches SUBMIT_WORKFLOW_SUCCESS and changes request object', async () => {
    const mockStatus = 'mock-stauts';
    const mockError = 'some-error';
    const mockWorkflowId = 'mock-workflow-id';

    const actionToDispatch = {
      type: ActionTypes.SUBMIT_WORKFLOW_SUCCESS,
      payload: {
        status: mockStatus,
        error: mockError,
        data: { id: mockWorkflowId },
      },
    };
    const expectedActions = [actionToDispatch];
    const expectedState = {
      ...initialState,
      request: { status: mockStatus, error: mockError },
      workflowId: mockWorkflowId,
    };

    await store.dispatch(actionToDispatch);

    expect(store.getActions()).toEqual(expectedActions);
    expect(reducer(initialState, actionToDispatch)).toEqual(expectedState);
  });
});
