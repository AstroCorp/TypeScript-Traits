import ApplyTraits from "../../../applyTraits";
import PropertiesFile from "../traits/PropertiesFile";
import { PropertiesWithErrorInstanceType } from "../types/types";

@ApplyTraits({}, PropertiesFile)
class PropertiesWithError {
    #filename?: number;

    get Instance() {
        return this as unknown as PropertiesWithErrorInstanceType;
    }

    static create() {
        return new PropertiesWithError().Instance;
    }

    get filename(): number | undefined {
        return this.#filename;
    }

    set filename(filename: number) {
        this.#filename = filename;
    }
}

export default PropertiesWithError;
