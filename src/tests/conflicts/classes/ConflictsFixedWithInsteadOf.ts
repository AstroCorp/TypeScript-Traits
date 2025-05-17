import ApplyTraits from "../../../applyTraits";
import ConflictsLogger from "../traits/ConflictsLogger";
import ConflictsDebugger from "../traits/ConflictsDebugger";
import ConflictsExceptions from "../traits/ConflictsExceptions";
import { ConflictsFixedDTO, ConflictsFixedWithInsteadOfInstanceType } from "../types/types";

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
    ],
}, ConflictsLogger, ConflictsDebugger, ConflictsExceptions)
class ConflictsFixedWithInsteadOf {
    name: string;

    constructor(dto: ConflictsFixedDTO) {
        this.name = dto.name;
    }

    get Instance() {
        return this as unknown as ConflictsFixedWithInsteadOfInstanceType;
    }

    static create(dto: ConflictsFixedDTO) {
        return new ConflictsFixedWithInsteadOf(dto).Instance;
    }
}

export default ConflictsFixedWithInsteadOf;
