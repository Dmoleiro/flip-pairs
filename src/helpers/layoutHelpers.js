import {SIX_BY_SIX, THREE_BY_THREE, FOUR_BY_FOUR} from "../constants/gameComplexities";

export function generateSelectedStateMatrix(complexity) {
    let selectedStateMatrix;
    switch (complexity) {
        case THREE_BY_THREE:
        case FOUR_BY_FOUR:
        case SIX_BY_SIX:
            let auxArray = new Array(complexity);
            auxArray.fill(0);
            selectedStateMatrix = new Array(complexity);
            selectedStateMatrix.fill(auxArray);
            break;
        default:
            break;
    }
    return selectedStateMatrix;
}