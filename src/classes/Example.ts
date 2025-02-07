import Logger from "../traits/logger";
import Serializable from "../traits/serializable";
import { ExampleDTO, ExampleInstanceType } from "../types/types";
import ApplyTraits from "../utils/applyTraits";
import ExampleBaseWithExtends from "./ExampleBaseWithExtends";

@ApplyTraits({}, Logger, Serializable)
class Example extends ExampleBaseWithExtends {
    name: string

    constructor(dto: ExampleDTO) {
        super();
        this.name = dto.name;
    }

    get Instance() {
        return this as unknown as ExampleInstanceType;
    }

    static create(dto: ExampleDTO) {
        return new Example(dto).Instance;
    }

    log() {
        return 'Example log';
    }
}

export default Example;
