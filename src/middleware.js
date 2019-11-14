import {SET_TILE_COUNT} from "./constants/actionTypes";
import {toggleFlipAllTiles} from "./actions/layoutActions";

export default function Middleware({getState, dispatch}) {
  return next => action => {
      switch (action.type) {
          case SET_TILE_COUNT:
              setTimeout(() => dispatch(toggleFlipAllTiles()), 3000);
            break;
          default:
            break;
      }
      return next(action);
  }
}
