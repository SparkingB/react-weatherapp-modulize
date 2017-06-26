import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { weathers } from '../reducers/WeatherReducer'
import { loading } from '../reducers/LoadingReducer'

const composedReducer = combineReducers({weathers,loading});

export const store = createStore(
  composedReducer,
  applyMiddleware(thunk)
);