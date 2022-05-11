

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import currencyReducer from "./reducer"


const middleware = [thunk];

const reducer = combineReducers({
  currencyReducer
});

export const store = createStore(reducer, applyMiddleware(...middleware));
