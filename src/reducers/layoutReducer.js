import {
    FLIP_TILE,
    RESET_TILES,
    SET_TILE_COUNT,
    TOGGLE_CELEBRATION,
    TOGGLE_FLIP_ALL_TILES,
    TOGGLE_CONTROL_PANEL_VISIBILITY,
    RESET_GAME
} from '../constants/actionTypes';
import {flipTile, generateSelectedStateMatrix, toggleMatrixState} from "../helpers/layoutHelpers";
import {HALTED, STARTED, RESET} from '../constants/gameStates';
import defaultSoreValues from '../constants/defaultStoreValues';

export default(state, action) => {
  let newSelectedStateMatrix;
  switch(action.type) {
    case SET_TILE_COUNT:
        return {
            ...state,
            tileCount: action.tileCount,
            selectedStateMatrix: generateSelectedStateMatrix(action.tileCount),
            previewFlip: true,
            celebration: false,
            showControlPanel: false,
            gameState: STARTED,
        };
      case RESET_TILES:
        return {
            ...state,
            selectedStateMatrix: generateSelectedStateMatrix(state.tileCount),
            previewFlip: true,
            celebration: false,
            showControlPanel: false,
            gameState: RESET,
        };
      case TOGGLE_FLIP_ALL_TILES:
          newSelectedStateMatrix = toggleMatrixState(state.selectedStateMatrix.slice(), action.forceState, action.flipDone);

          return {
              ...state,
              selectedStateMatrix: newSelectedStateMatrix,
              previewFlip: action.previewFlip,
          };
      case FLIP_TILE:
          newSelectedStateMatrix = flipTile(state.selectedStateMatrix.slice(), action.row, action.col);

          return {
              ...state,
              selectedStateMatrix: newSelectedStateMatrix,
          };
      case TOGGLE_CELEBRATION:
          return {
              ...state,
              celebration: !state.celebration,
              gameState: HALTED
          };
      case TOGGLE_CONTROL_PANEL_VISIBILITY:
          return {
              ...state,
              showControlPanel: !state.showControlPanel,
              gameState: state.showControlPanel ? STARTED : HALTED
          }
    case RESET_GAME:
        return defaultSoreValues;
            
    default:
      return state;
  }
};
