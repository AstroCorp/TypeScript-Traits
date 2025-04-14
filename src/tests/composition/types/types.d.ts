import Composition from "../classes/Composition";
import CompositionCalc from "../traits/CompositionCalc";
import CompositionLogger from "../traits/CompositionLogger";

export type CompositionInstanceType = Composition & CompositionLogger & CompositionCalc;
