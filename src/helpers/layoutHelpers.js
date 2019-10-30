import {SIX_BY_SIX, THREE_BY_THREE, FOUR_BY_FOUR} from "../constants/gameComplexities";

export function generateSelectedStateMatrix(complexity) {
    let selectedStateMatrix;
    switch (complexity) {
        case THREE_BY_THREE:
        case FOUR_BY_FOUR:
        case SIX_BY_SIX:
            let auxArray = new Array(Math.sqrt(complexity));
            auxArray.fill(false);
            selectedStateMatrix = new Array(Math.sqrt(complexity));
            selectedStateMatrix.fill(auxArray);
            break;
        default:
            break;
    }
    return selectedStateMatrix;
}

export function toggleMatrixState(matrix) {
    for (let i=0; i<matrix.length; i++) {
        for (let j=0; j<matrix[i].length; j++) {
            matrix[i][j] = !matrix[i][j];
        }
    }
    return matrix;
}