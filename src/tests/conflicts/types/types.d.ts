import Conflicts from "../classes/Conflicts";
import ConflictsFixed from "../classes/ConflictsFixed";
import ConflictsLogger from "../traits/ConflictsLogger";
import ConflictsDebugger from "../traits/ConflictsDebugger";
import ConflictsExceptions from "../traits/ConflictsExceptions";

export interface ConflictsDTO {
    name: string;
}

export type ConflictsInstanceType = Conflicts & ConflictsLogger & ConflictsDebugger & ConflictsExceptions;

export interface ConflictsFixedDTO {
    name: string;
}

export type ConflictsFixedInstanceType = ConflictsFixed & ConflictsLogger & ConflictsDebugger & ConflictsExceptions;
