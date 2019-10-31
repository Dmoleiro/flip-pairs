import {FLIP_TILE, SET_TILE_COUNT, TOGGLE_FLIP_ALL_TILES} from "../constants/actionTypes";

export function setTileCount(tileCount) {
    return {type: SET_TILE_COUNT, tileCount};
}

export function toggleFlipAllTiles() {
    return {type: TOGGLE_FLIP_ALL_TILES};
}

export function toggleFlipTile(row, col) {
    return {type: FLIP_TILE, row, col};
}