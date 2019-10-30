import {SET_TILE_COUNT, TOGGLE_FLIP_ALL_TILES} from '../constants/actionTypes';
import {generateSelectedStateMatrix, toggleMatrixState} from "../helpers/layoutHelpers";

export default(state, action) => {
  switch(action.type) {
    case SET_TILE_COUNT:
        return {
            ...state,
            tileCount: action.tileCount,
            selectedStateMatrix: generateSelectedStateMatrix(action.tileCount)
        };
      case TOGGLE_FLIP_ALL_TILES:
          let newSelectedStateMatrix = toggleMatrixState(state.selectedStateMatrix.slice());

          return {
              ...state,
              selectedStateMatrix: newSelectedStateMatrix,
          };
    default:
      return state;
  }
};
