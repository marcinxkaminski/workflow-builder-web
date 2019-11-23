
import requestDispatch from './requestDispatch';
import * as ActionTypes from '../data/ActionTypes';
import * as RequestStatuses from '../data/RequestStatuses';

jest.mock('../data/ActionTypes', () => ({ _SUCCESS_SUFIX: 'SUCCESS', _ERROR_SUFIX: 'ERROR' }));
jest.mock('../data/RequestStatuses', () => ({ PENDING: 'PENDING', SUCCESS: 'SUCCESS', ERROR: 'ERROR' }));

describe('REQUEST DISPATCH', () => {
  const mockDispatch = jest.fn();
  const mockRequestActionType = 'REQUEST';

  it('dispatches request with success', async () => {
    const mockResponse = 'mock-response';
    const mockCallbackFunction = jest.fn(async () => mockResponse);

    const res = await requestDispatch(mockRequestActionType, mockCallbackFunction)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: `${mockRequestActionType}`, payload: { status: RequestStatuses.PENDING },
    });

    expect(mockDispatch).toHaveBeenLastCalledWith({
      // eslint-disable-next-line no-underscore-dangle
      type: `${mockRequestActionType}_${ActionTypes._SUCCESS_SUFIX}`,
      payload: {
        status: RequestStatuses.SUCCESS, data: mockResponse,
      },
    });

    expect(mockCallbackFunction).toHaveBeenCalledTimes(1);
    expect(res).toEqual(mockResponse);
  });

  it('dispatches request with success with callback params', async () => {
    const mockResponse = 'mock-response';
    const mockCallbackFunction = jest.fn(async () => mockResponse);
    const mockCallbackFunctionProps = { some: 'mock' };

    const res = await requestDispatch(
      mockRequestActionType, mockCallbackFunction, mockCallbackFunctionProps,
    )(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: `${mockRequestActionType}`, payload: { status: RequestStatuses.PENDING },
    });

    expect(mockDispatch).toHaveBeenLastCalledWith({
      // eslint-disable-next-line no-underscore-dangle
      type: `${mockRequestActionType}_${ActionTypes._SUCCESS_SUFIX}`,
      payload: {
        status: RequestStatuses.SUCCESS, data: mockResponse,
      },
    });

    expect(mockCallbackFunction).toHaveBeenCalledWith(mockCallbackFunctionProps);
    expect(res).toEqual(mockResponse);
  });

  it('dispatches request with error', async () => {
    const mockError = new Error();
    const mockCallbackFunction = jest.fn(async () => { throw mockError; });
    console.error = jest.fn();

    const res = await requestDispatch(
      mockRequestActionType, mockCallbackFunction,
    )(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: `${mockRequestActionType}`, payload: { status: RequestStatuses.PENDING },
    });

    expect(mockDispatch).toHaveBeenLastCalledWith({
      // eslint-disable-next-line no-underscore-dangle
      type: `${mockRequestActionType}_${ActionTypes._ERROR_SUFIX}`,
      payload: {
        status: RequestStatuses.ERROR, error: mockError,
      },
    });

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(mockCallbackFunction).toHaveBeenCalledTimes(1);
    expect(res).toEqual(null);
  });
});
