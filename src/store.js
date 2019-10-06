import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export default createStore(null, null, applyMiddleware(thunk));
