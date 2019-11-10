import {generateSelectedStateMatrix} from "../helpers/layoutHelpers";
import {FOUR_BY_FOUR} from "./gameComplexities";

export default {
    tileCount: FOUR_BY_FOUR,
    selectedStateMatrix: generateSelectedStateMatrix(FOUR_BY_FOUR),
}
