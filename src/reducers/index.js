// Constants
import defaultStoreValues from '../constants/defaultStoreValues';
// Reducers
import layoutReducer from './layoutReducer';
// NOTE: when new reducers are created at this level, they must be added to this array
let reducers = [
  layoutReducer
];

export default(state = defaultStoreValues, action = {}) => {
  let newState = state;

  for (let i = 0; i < reducers.length; i++) {
    newState = reducers[i](newState, action);
  }

  return newState;
};
