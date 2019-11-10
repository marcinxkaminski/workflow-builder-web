import { SUCCESS_SUFIX, ERROR_SUFIX } from '../data/ActionTypes';
import RequestStatuses from '../data/RequestStatuses';

export default function requestDispatch(actionType, func, params = null) {
  return async (dispatch) => {
    try {
      dispatch({ type: actionType, payload: { status: RequestStatuses.PENDING } });
      const data = await (params ? func(params) : func());
      dispatch({ type: `${actionType}_${SUCCESS_SUFIX}`, payload: { status: RequestStatuses.SUCCESS, data } });
      return data;
    } catch (error) {
      console.error(error);
      dispatch({ type: `${actionType}_${ERROR_SUFIX}`, payload: { status: RequestStatuses.ERROR, error } });
      return null;
    }
  };
}
