import {SET_TILE_COUNT} from "../constants/actionTypes";

export function setTileCount(tileCount) {
    return {type: SET_TILE_COUNT, tileCount};
}