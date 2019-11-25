import {FLIP_TILE, IGNORE, RESET_TILES, SET_TILE_COUNT, TOGGLE_FLIP_ALL_TILES} from "./constants/actionTypes";
import {toggleCelebration, toggleFlipAllTiles} from "./actions/layoutActions";
import {countFlippedCards} from "./helpers/layoutHelpers";

export default function Middleware({getState, dispatch}) {
  return next => action => {
      switch (action.type) {
          case SET_TILE_COUNT:
          case RESET_TILES:
              // timer is stored in window so that only one timer at a time exists
              if (action.tileCount !== getState().fp.tileCount) {
                  clearTimeout(window.flipTimer);
                  clearTimeout(window.resetTimer);
                  window.flipTimer = setTimeout(() => dispatch(toggleFlipAllTiles()), 3000);
              } else {
                  action.type = IGNORE;
              }
            break;
          case FLIP_TILE:
              // check if no more than 2 tiles are flipped at a time
              let flippedCardsCount = countFlippedCards(getState().fp.selectedStateMatrix, true);
              if (flippedCardsCount < 2 && !getState().fp.previewFlip) {
                  clearTimeout(window.resetTimer);
                  window.resetTimer = setTimeout(() => dispatch(toggleFlipAllTiles(false, false)), 2000);
              } else {
                  action.type = IGNORE;
              }
            break;
          case TOGGLE_FLIP_ALL_TILES:
              if (!action.forceState && !action.flipDone) {
                  // check if all tiles are flipped
                  let flippedCardsCount = countFlippedCards(getState().fp.selectedStateMatrix);
                  if (flippedCardsCount === getState().fp.tileCount) {
                      // all tiles are flipped, lets celebrate
                      dispatch(toggleCelebration());
                  }
              }
              break;
          default:
            break;
      }
      return next(action);
  }
}
