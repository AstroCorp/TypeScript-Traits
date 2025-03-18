import ApplyTraits from "../../../applyTraits";
import ConflictsLogger from "../traits/ConflictsLogger";
import ConflictsDebugger from "../traits/ConflictsDebugger";
import ConflictsExceptions from "../traits/ConflictsExceptions";
import { ConflictsFixedDTO, ConflictsFixedInstanceType } from "../types/types";

@ApplyTraits({
    resolve: [
        {
            methodName: 'log',
            className: 'ConflictsLogger',
        },
        {
            methodName: 'debug',
            className: 'ConflictsDebugger',
        },
    ],
}, ConflictsLogger, ConflictsDebugger, ConflictsExceptions)
class ConflictsFixed {
    name: string;

    constructor(dto: ConflictsFixedDTO) {
        this.name = dto.name;
    }

    get Instance() {
        return this as unknown as ConflictsFixedInstanceType;
    }

    static create(dto: ConflictsFixedDTO) {
        return new ConflictsFixed(dto).Instance;
    }
}

export default ConflictsFixed;
