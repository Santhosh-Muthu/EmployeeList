import { applyMiddleware } from 'redux';
import ThunkMiddleware  from 'redux-thunk';
import combineReducers from '../reducers/CombineReducers';
import { createStore } from 'redux';

export const Store = createStore(combineReducers,applyMiddleware(ThunkMiddleware));
