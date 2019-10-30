import {SET_TILE_COUNT, TOGGLE_FLIP_ALL_TILES} from "../constants/actionTypes";

export function setTileCount(tileCount) {
    return {type: SET_TILE_COUNT, tileCount};
}

export function toggleFlipAllTiles() {
    return {type: TOGGLE_FLIP_ALL_TILES};
}