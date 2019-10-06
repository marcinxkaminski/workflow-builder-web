// import ActionTypes from '../data/ActionTypes';
// import RequestStatuses from '../data/RequestStatuses';

const initialState = {
  request: {
    status: null,
    error: null,
  },
  selectedWorkflowElements: null,
  inputData: null,
  resultData: null,
};

export default function dropzoneReducer(state = initialState, { type, payload }) {
  switch (type) {
    default:
      return state;
  }
}
