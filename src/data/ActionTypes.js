/* eslint-disable no-underscore-dangle */
export const _SUCCESS_SUFIX = 'SUCCESS';
export const _ERROR_SUFIX = 'ERROR';

// ACTIONS
// app actions
export const GET_AVAILABLE_WORKFLOW_ELEMENTS = 'GET_AVAILABLE_WORKFLOW_ELEMENTS';
export const GET_AVAILABLE_WORKFLOW_ELEMENTS_SUCCESS = `GET_AVAILABLE_WORKFLOW_ELEMENTS_${_SUCCESS_SUFIX}`;
export const GET_AVAILABLE_WORKFLOW_ELEMENTS_ERROR = `GET_AVAILABLE_WORKFLOW_ELEMENTS_${_ERROR_SUFIX}`;

// workflow actions
export const GET_RESULTS_FOR_DATA = 'GET_RESULTS_FOR_DATA';
export const GET_RESULTS_FOR_DATA_SUCCESS = `GET_RESULTS_FOR_DATA_${_SUCCESS_SUFIX}`;
export const GET_RESULTS_FOR_DATA_ERROR = `GET_RESULTS_FOR_DATA_${_ERROR_SUFIX}`;

export const ADD_WORKFLOW_ELEMENT = 'ADD_WORKFLOW_ELEMENT';

export const DELETE_WORKFLOW_ELEMENT = 'DELETE_WORKFLOW_ELEMENT';

export const SUBMIT_WORKFLOW = 'SUBMIT_WORKFLOW';
export const SUBMIT_WORKFLOW_SUCCESS = `SUBMIT_WORKFLOW_${_SUCCESS_SUFIX}`;
export const SUBMIT_WORKFLOW_ERROR = `SUBMIT_WORKFLOW_${_ERROR_SUFIX}`;
