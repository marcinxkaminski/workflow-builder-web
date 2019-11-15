import { _SUCCESS_SUFIX, _ERROR_SUFIX } from '../data/ActionTypes';
import { PENDING, SUCCESS, ERROR } from '../data/RequestStatuses';

export default function requestDispatch(actionType, func, params = null) {
  return async (dispatch) => {
    try {
      dispatch({ type: actionType, payload: { status: PENDING } });
      const data = await (params ? func(params) : func());
      dispatch({ type: `${actionType}_${_SUCCESS_SUFIX}`, payload: { status: SUCCESS, data } });
      return data;
    } catch (error) {
      console.error(error);
      dispatch({ type: `${actionType}_${_ERROR_SUFIX}`, payload: { status: ERROR, error } });
      return null;
    }
  };
}
