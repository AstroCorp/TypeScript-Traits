import ApplyTraits from "../../../utils/applyTraits";
import PriorityLogger from "../traits/PriorityLogger";
import { PriorityExample2DTO, PriorityExample2InstanceType } from "../types/types";
import PriorityBase from "./PriorityBase";

@ApplyTraits({}, PriorityLogger)
class PriorityExample2 extends PriorityBase {
    name: string

    constructor(dto: PriorityExample2DTO) {
        super();
        this.name = dto.name;
    }

    get Instance() {
        return this as unknown as PriorityExample2InstanceType;
    }

    static create(dto: PriorityExample2DTO) {
        return new PriorityExample2(dto).Instance;
    }
}

export default PriorityExample2;
