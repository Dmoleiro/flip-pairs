import {SET_TILE_COUNT} from "./constants/actionTypes";

export default function Middleware({getState, dispatch}) {
  return next => action => {
      switch (action.type) {
          case SET_TILE_COUNT:
            break;
          default:
            break;
      }
      return next(action);
  }
}
