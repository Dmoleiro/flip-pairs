import {generateSelectedStateMatrix} from "../helpers/layoutHelpers";
import {NOT_BY_NOT} from "./gameComplexities";
import {HALTED} from "./gameStates";

export default {
    tileCount: NOT_BY_NOT,
    showControlPanel: true,
    previewFlip : true,
    selectedStateMatrix: generateSelectedStateMatrix(NOT_BY_NOT),
    celebration: false,
    gameState: HALTED,
}
