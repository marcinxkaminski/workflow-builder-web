/* eslint-disable no-underscore-dangle */
/* global expect, describe */
import * as ActionTypes from './ActionTypes';

describe('ACTION TYPES', () => {
  it('has action success sufix', async () => {
    expect(ActionTypes._SUCCESS_SUFIX).toEqual('SUCCESS');
  });

  it('has action error sufix', async () => {
    expect(ActionTypes._ERROR_SUFIX).toEqual('ERROR');
  });

  it('has action GET_AVAILABLE_WORKFLOW_ELEMENTS with both SUCCESS and ERROR', async () => {
    expect(ActionTypes.GET_AVAILABLE_WORKFLOW_ELEMENTS).toEqual('GET_AVAILABLE_WORKFLOW_ELEMENTS');

    expect(ActionTypes.GET_AVAILABLE_WORKFLOW_ELEMENTS_SUCCESS).toEqual(`GET_AVAILABLE_WORKFLOW_ELEMENTS_${ActionTypes._SUCCESS_SUFIX}`);

    expect(ActionTypes.GET_AVAILABLE_WORKFLOW_ELEMENTS_ERROR).toEqual(`GET_AVAILABLE_WORKFLOW_ELEMENTS_${ActionTypes._ERROR_SUFIX}`);
  });

  it('has action GET_RESULTS_FOR_DATA with both SUCCESS and ERROR', async () => {
    expect(ActionTypes.GET_RESULTS_FOR_DATA).toEqual('GET_RESULTS_FOR_DATA');

    expect(ActionTypes.GET_RESULTS_FOR_DATA_SUCCESS).toEqual(`GET_RESULTS_FOR_DATA_${ActionTypes._SUCCESS_SUFIX}`);

    expect(ActionTypes.GET_RESULTS_FOR_DATA_ERROR).toEqual(`GET_RESULTS_FOR_DATA_${ActionTypes._ERROR_SUFIX}`);
  });

  it('has action SUBMIT_WORKFLOW with both SUCCESS and ERROR', async () => {
    expect(ActionTypes.SUBMIT_WORKFLOW).toEqual('SUBMIT_WORKFLOW');

    expect(ActionTypes.SUBMIT_WORKFLOW_SUCCESS).toEqual(`SUBMIT_WORKFLOW_${ActionTypes._SUCCESS_SUFIX}`);

    expect(ActionTypes.SUBMIT_WORKFLOW_ERROR).toEqual(`SUBMIT_WORKFLOW_${ActionTypes._ERROR_SUFIX}`);
  });

  it('has action ADD_WORKFLOW_ELEMENT', async () => {
    expect(ActionTypes.ADD_WORKFLOW_ELEMENT).toEqual('ADD_WORKFLOW_ELEMENT');
  });

  it('has action ADD_WORKFLOW_ELEMENT', async () => {
    expect(ActionTypes.DELETE_WORKFLOW_ELEMENT).toEqual('DELETE_WORKFLOW_ELEMENT');
  });
});
