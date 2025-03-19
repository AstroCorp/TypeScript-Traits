import ApplyTraits from "../../../applyTraits";
import ConflictsLogger from "../traits/ConflictsLogger";
import ConflictsDebugger from "../traits/ConflictsDebugger";
import ConflictsExceptions from "../traits/ConflictsExceptions";
import { ConflictsFixedDTO, ConflictsFixedInstanceType } from "../types/types";

@ApplyTraits({
    resolve: [
        {
            className: 'ConflictsLogger',
            methodName: 'log',
        },
        {
            className: 'ConflictsDebugger',
            methodName: 'debug',
        },
        {
            className: 'ConflictsExceptions',
            methodName: 'debug',
            newMethodName: 'debugRenamed',
        },
    ],
}, ConflictsLogger, ConflictsDebugger, ConflictsExceptions)
class ConflictsFixedWithAs {
    name: string;

    constructor(dto: ConflictsFixedDTO) {
        this.name = dto.name;
    }

    get Instance() {
        return this as unknown as ConflictsFixedInstanceType;
    }

    static create(dto: ConflictsFixedDTO) {
        return new ConflictsFixedWithAs(dto).Instance;
    }
}

export default ConflictsFixedWithAs;
