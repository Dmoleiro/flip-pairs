import {
    FLIP_TILE,
    RESET_TILES,
    SET_TILE_COUNT,
    TOGGLE_CELEBRATION,
    TOGGLE_FLIP_ALL_TILES
} from "../constants/actionTypes";

export function setTileCount(tileCount) {
    return {type: SET_TILE_COUNT, tileCount};
}

export function toggleFlipAllTiles(forceState = undefined, flipDone = true, previewFlip = false) {
    return {type: TOGGLE_FLIP_ALL_TILES, forceState, flipDone, previewFlip};
}

export function toggleFlipTile(row, col) {
    return {type: FLIP_TILE, row, col};
}

export function resetTiles() {
    return {type: RESET_TILES};
}

export function toggleCelebration() {
    return {type: TOGGLE_CELEBRATION}
}