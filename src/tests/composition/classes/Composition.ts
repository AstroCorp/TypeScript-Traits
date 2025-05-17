import ApplyTraits from "../../../applyTraits";
import CompositionComposed from "../traits/CompositionComposed";
import { CompositionInstanceType } from "../types/types";

@ApplyTraits({}, CompositionComposed)
class Composition {
    get Instance() {
        return this as unknown as CompositionInstanceType;
    }

    static create() {
        return new Composition().Instance;
    }
}

export default Composition;
