import {SIX_BY_SIX, THREE_BY_THREE, FOUR_BY_FOUR} from "../constants/gameComplexities";

export function generateSelectedStateMatrix(complexity) {
    let selectedStateMatrix;
    switch (complexity) {
        case THREE_BY_THREE:
        case FOUR_BY_FOUR:
        case SIX_BY_SIX:
            let rowItemCount = Math.sqrt(complexity);
            selectedStateMatrix = new Array(rowItemCount);
            //selectedStateMatrix.fill(new Array(Math.sqrt(complexity)).fill(false).slice());
            for (let i=0; i<selectedStateMatrix.length; i++) {
                selectedStateMatrix[i] = new Array(rowItemCount).fill(false);
            }
            break;
        default:
            break;
    }
    return selectedStateMatrix;
}

export function toggleMatrixState(matrix) {
    if (matrix !== undefined) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                matrix[i][j] = !matrix[i][j];
            }
        }
    }
    return matrix;
}

export function flipTile(matrix, row, col) {
    if (matrix !== undefined && row !== undefined && col !== undefined) {
        matrix[row][col] = !matrix[row][col];
        return matrix;
    }
    return ;
}