import {FLIP_TILE, RESET_TILES, SET_TILE_COUNT} from "./constants/actionTypes";
import {toggleFlipAllTiles} from "./actions/layoutActions";

export default function Middleware({getState, dispatch}) {
  return next => action => {
      switch (action.type) {
          case SET_TILE_COUNT:
          case RESET_TILES:
              // timer is stored in window so that only one timer at a time exists
              if (action.type === RESET_TILES || (action.tileCount !== getState().fp.tileCount)) {
                  clearTimeout(window.flipTimer);
                  window.flipTimer = setTimeout(() => dispatch(toggleFlipAllTiles()), 3000);
              }
            break;
          case FLIP_TILE:
              clearTimeout(window.resetTimer);
              window.resetTimer = setTimeout(() => dispatch(toggleFlipAllTiles(false, false)),2000);
            break;
          default:
            break;
      }
      return next(action);
  }
}
