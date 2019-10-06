import { SUCCESS_SUFIX, ERROR_SUFIX } from '../data/ActionTypes';

export default function requestDispatch(actionType, func) {
  return async (dispatch) => {
    try {
      dispatch({ type: actionType });
      const res = await func();
      dispatch({ type: `${actionType}_${SUCCESS_SUFIX}`, payload: res });
      return res;
    } catch (err) {
      console.error(err);
      dispatch({ type: `${actionType}_${ERROR_SUFIX}`, payload: err });
      return null;
    }
  };
}
