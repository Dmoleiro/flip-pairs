import {FLIP_TILE, SET_TILE_COUNT, TOGGLE_FLIP_ALL_TILES} from '../constants/actionTypes';
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
      case TOGGLE_FLIP_ALL_TILES:
          newSelectedStateMatrix = toggleMatrixState(state.selectedStateMatrix.slice());

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
