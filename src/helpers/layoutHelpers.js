import {SIX_BY_SIX, TWO_BY_TWO, FOUR_BY_FOUR, NOT_BY_NOT} from "../constants/gameComplexities";

export function generateSelectedStateMatrix(complexity) {
    let selectedStateMatrix;
    if (complexity > NOT_BY_NOT) {
        let urlList = createUrlList(complexity / 2);
        switch (complexity) {
            case TWO_BY_TWO:
            case FOUR_BY_FOUR:
            case SIX_BY_SIX:
                let rowItemCount = Math.sqrt(complexity);
                selectedStateMatrix = new Array(rowItemCount);

                for (let i = 0; i < selectedStateMatrix.length; i++) {
                    selectedStateMatrix[i] = new Array(rowItemCount);
                    for (let j = 0; j < selectedStateMatrix[i].length; j++) {
                        let urlIndex = Math.floor(Math.random() * urlList.length)
                        selectedStateMatrix[i][j] = {
                            flipped: true,
                            done: false,
                            url: urlList[urlIndex].url,
                            imgId: urlList[urlIndex].originalIdx,
                        };

                        urlList[urlIndex].timesUsed = urlList[urlIndex].timesUsed + 1;
                        if (urlList[urlIndex].timesUsed > 1) {
                            urlList.splice(urlIndex, 1);
                        }
                    }
                }
                break;
            default:
                break;
        }
    }
    return selectedStateMatrix;
}

export function toggleMatrixState(matrix, forceState, flipDone) {
    if (matrix !== undefined) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if ((!flipDone && !matrix[i][j].done) || flipDone) {
                    matrix[i][j].flipped = forceState !== undefined ? forceState : !matrix[i][j].flipped;
                    matrix[i][j].done = false;
                }
            }
        }
    }
    return matrix;
}

export function flipTile(matrix, row, col) {
    if (matrix !== undefined && row !== undefined && col !== undefined && !matrix[row][col].done) {
        if (matrix[row][col].done === false) {
            if (!matrix[row][col].flipped) {
                let isMatch = isImageAlreadyFlipped(matrix, matrix[row][col].imgId);
                matrix[row][col].done = isMatch;
            }
            matrix[row][col].flipped = !matrix[row][col].flipped;
        }

    }
    return matrix;
}

function createUrlList(length) {
    let urlList = new Array(length);
    for (let i=0; i<urlList.length; i++){
        urlList[i] = {
            url: ("https://picsum.photos/300/300?bust=" + Math.floor(Math.random() * Math.floor(length)) + i),
            timesUsed: 0,
            originalIdx: i,
        }
    }
    return urlList;
}

function isImageAlreadyFlipped(matrix, imgId) {
    let item = undefined;
    if (matrix !== undefined && imgId !== undefined) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j].imgId === imgId && matrix[i][j].flipped === true) {
                    item = matrix[i][j];
                }
            }
        }
    }

    if (item !== undefined) {
        item.done = true;
    }
    return item !== undefined;
}
