import CustomLog from "../traits/customLog";
import Logger from "../traits/logger";
import { ExampleDTO, ExampleWithResolveInstanceType } from "../types/types";
import ApplyTraits from "../utils/applyTraits";

@ApplyTraits({
    resolve: [
        {
            className: 'Logger',
            methodName: 'log',
            otherClasses: ['CustomLog'],
        },
    ],
}, Logger, CustomLog)
class ExampleWithResolve {
    name: string

    constructor(dto: ExampleDTO) {
        this.name = dto.name;
    }

    get Instance() {
        return this as unknown as ExampleWithResolveInstanceType;
    }

    static create(dto: ExampleDTO) {
        return new ExampleWithResolve(dto).Instance;
    }
}

export default ExampleWithResolve;
