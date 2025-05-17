import ApplyTraits from "../../../applyTraits";
import CompositionComposedWithConflicts from "../traits/CompositionComposedWithConflicts";
import { CompositionWithConflictsInstanceType } from "../types/types";

@ApplyTraits({}, CompositionComposedWithConflicts)
class CompositionWithConflicts {
    get Instance() {
        return this as unknown as CompositionWithConflictsInstanceType;
    }

    static create() {
        return new CompositionWithConflicts().Instance;
    }
}

export default CompositionWithConflicts;
