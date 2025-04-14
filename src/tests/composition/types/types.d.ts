import Composition from "../classes/Composition";
import CompositionCalc from "../traits/CompositionCalc";
import CompositionDebugger from "../traits/CompositionDebugger";
import CompositionLogger from "../traits/CompositionLogger";

export type CompositionInstanceType = Composition & CompositionLogger & CompositionCalc;

export type CompositionWithConflictsInstanceType = Composition & CompositionLogger & CompositionCalc & CompositionDebugger;
