import ApplyTraits from "../../../applyTraits";
import ConflictsLogger from "../traits/ConflictsLogger";
import ConflictsDebugger from "../traits/ConflictsDebugger";
import ConflictsExceptions from "../traits/ConflictsExceptions";
import { ConflictsDTO, ConflictsInstanceType } from "../types/types";

@ApplyTraits({},ConflictsLogger, ConflictsDebugger, ConflictsExceptions)
class Conflicts {
    name: string;

    constructor(dto: ConflictsDTO) {
        this.name = dto.name;
    }

    get Instance() {
        return this as unknown as ConflictsInstanceType;
    }

    static create(dto: ConflictsDTO) {
        return new Conflicts(dto).Instance;
    }
}

export default Conflicts;
