import ApplyTraits from "../../../utils/applyTraits";
import PriorityLogger from "../traits/PriorityLogger";
import { PriorityExample1DTO, PriorityExample1InstanceType } from "../types/types";
import PriorityBase from "./PriorityBase";

@ApplyTraits({}, PriorityLogger)
class PriorityExample1 extends PriorityBase {
    name: string

    constructor(dto: PriorityExample1DTO) {
        super();
        this.name = dto.name;
    }

    get Instance() {
        return this as unknown as PriorityExample1InstanceType;
    }

    static create(dto: PriorityExample1DTO) {
        return new PriorityExample1(dto).Instance;
    }

    log() {
        return 'PriorityExample1 log';
    }
}

export default PriorityExample1;
