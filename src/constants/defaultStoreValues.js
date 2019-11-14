import {generateSelectedStateMatrix} from "../helpers/layoutHelpers";
import {NOT_BY_NOT} from "./gameComplexities";

export default {
    tileCount: NOT_BY_NOT,
    selectedStateMatrix: generateSelectedStateMatrix(NOT_BY_NOT),
}
