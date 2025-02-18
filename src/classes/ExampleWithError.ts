import CustomLog from "../traits/customLog";
import Logger from "../traits/logger";
import { ExampleDTO, ExampleWithErrorInstanceType } from "../types/types";
import ApplyTraits from "../utils/applyTraits";

@ApplyTraits({}, Logger, CustomLog)
class ExampleWithError {
    name: string

    constructor(dto: ExampleDTO) {
        this.name = dto.name;
    }

    get Instance() {
        return this as unknown as ExampleWithErrorInstanceType;
    }

    static create(dto: ExampleDTO) {
        return new ExampleWithError(dto).Instance;
    }
}

export default ExampleWithError;
