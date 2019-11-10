import {SIX_BY_SIX, TWO_BY_TWO, FOUR_BY_FOUR} from "../constants/gameComplexities";

export function generateSelectedStateMatrix(complexity) {
    let selectedStateMatrix;
    let urlList = createUrlList(complexity / 2);
    switch (complexity) {
        case TWO_BY_TWO:
        case FOUR_BY_FOUR:
        case SIX_BY_SIX:
            let rowItemCount = Math.sqrt(complexity);
            selectedStateMatrix = new Array(rowItemCount);

            for (let i=0; i<selectedStateMatrix.length; i++) {
                selectedStateMatrix[i] = new Array(rowItemCount);
                for (let j=0; j<selectedStateMatrix[i].length; j++){
                    let urlIndex = Math.floor(Math.random() * Math.floor(urlList.length))
                    selectedStateMatrix[i][j] = {
                        flipped: false,
                        done: false,
                        url: urlList[urlIndex].url,
                        imgId: urlIndex
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
    return selectedStateMatrix;
}

export function toggleMatrixState(matrix) {
    if (matrix !== undefined) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                matrix[i][j].flipped = !matrix[i][j].flipped;
                matrix[i][j].done = false;
            }
        }
    }
    return matrix;
}

export function flipTile(matrix, row, col) {
    if (matrix !== undefined && row !== undefined && col !== undefined && !matrix[row][col].done) {
        matrix[row][col].done = isImageAlreadyFlipped(matrix, matrix[row][col].imgId);
        matrix[row][col].flipped = !matrix[row][col].flipped;
    }
    return matrix;
}

function createUrlList(length) {
    let urlList = new Array(length);
    for (let i=0; i<urlList.length; i++){
        urlList[i] = {
            url: ("https://picsum.photos/300/300?bust=" + Math.floor(Math.random() * Math.floor(length)) + i),
            timesUsed: 0
        }
    }
    return urlList;
}

function isImageAlreadyFlipped(matrix, imgId) {
    let item = undefined;
    if (matrix !== undefined && imgId !== undefined) {
        item =
            matrix.find((line) =>
                line.find((item) => {
                    return (item.imgId === imgId && item.flipped === true);
                })
            );
    }

    if (item !== undefined) {
        item.done = true;
    }
    return item !== undefined;
}
