import ApplyTraits from "../../../applyTraits";
import CompositionCalc from "./CompositionCalc";
import CompositionDebugger from "./CompositionDebugger";
import CompositionLogger from "./CompositionLogger";

@ApplyTraits({
    resolve: [
        {
            className: 'CompositionLogger',
            methodName: 'log',
        },
    ],
}, CompositionCalc, CompositionLogger, CompositionDebugger)
class CompositionComposedWithConflicts {
}

export default CompositionComposedWithConflicts;
