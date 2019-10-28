import {createStore, combineReducers, applyMiddleware} from 'redux';
import reducer from './reducers';
import middleware from './middleware';

// import systemMiddleware from './middleware/systemMiddleware';

/**
 *
 * @returns {object} created store
 */
export default function() {
  let combinedReducer = {
    fp: reducer
  };

  let combinedMiddleware = [middleware];

  const store = createStore(combineReducers(combinedReducer), applyMiddleware.apply(this, combinedMiddleware));

  if (process.env.NODE_ENV !== 'production') {
    window.store = store;
  }

  return store;
}
