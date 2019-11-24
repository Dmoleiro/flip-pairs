import {FLIP_TILE, RESET_TILES, SET_TILE_COUNT, TOGGLE_FLIP_ALL_TILES} from '../constants/actionTypes';
import {flipTile, generateSelectedStateMatrix, toggleMatrixState} from "../helpers/layoutHelpers";

export default(state, action) => {
  let newSelectedStateMatrix;
  switch(action.type) {
    case SET_TILE_COUNT:
        return {
            ...state,
            tileCount: action.tileCount,
            selectedStateMatrix: generateSelectedStateMatrix(action.tileCount)
        };
      case RESET_TILES:
        return {
            ...state,
            selectedStateMatrix: generateSelectedStateMatrix(state.tileCount)
        };
      case TOGGLE_FLIP_ALL_TILES:
          newSelectedStateMatrix = toggleMatrixState(state.selectedStateMatrix.slice(), action.forceState, action.flipDone);

          return {
              ...state,
              selectedStateMatrix: newSelectedStateMatrix,
          };
      case FLIP_TILE:
          newSelectedStateMatrix = flipTile(state.selectedStateMatrix.slice(), action.row, action.col);

          return {
              ...state,
              selectedStateMatrix: newSelectedStateMatrix,
          };
    default:
      return state;
  }
};
