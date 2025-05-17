import Conflicts from "../classes/Conflicts";
import ConflictsLogger from "../traits/ConflictsLogger";
import ConflictsDebugger from "../traits/ConflictsDebugger";
import ConflictsExceptions from "../traits/ConflictsExceptions";
import ConflictsFixedWithAs from "../classes/ConflictsFixedWithAs";
import ConflictsFixedWithInsteadOf from "../classes/ConflictsFixedWithInsteadOf";

export interface ConflictsDTO {
    name: string;
}

export type ConflictsInstanceType = Conflicts & ConflictsLogger & ConflictsDebugger & ConflictsExceptions;

export interface ConflictsFixedDTO {
    name: string;
}

interface ConflictsDebuggerFixed extends ConflictsDebugger {
    debugRenamed: ConflictsDebugger['debug'];
}

export type ConflictsFixedWithAsInstanceType = ConflictsFixedWithAs & ConflictsLogger & ConflictsDebuggerFixed & ConflictsExceptions;



export type ConflictsFixedWithInsteadOfInstanceType = ConflictsFixedWithInsteadOf & ConflictsLogger & ConflictsDebugger & ConflictsExceptions;
