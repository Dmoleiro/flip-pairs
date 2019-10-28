import {SET_TILE_COUNT} from '../constants/actionTypes';
import {generateSelectedStateMatrix} from "../helpers/layoutHelpers";

export default(state, action) => {
  switch(action.type) {
    case SET_TILE_COUNT:
        return {
            ...state,
            tileCount: action.tileCount,
            selectedStateMatrix: generateSelectedStateMatrix(action.tileCount)
        };
    default:
      return state;
  }
};
