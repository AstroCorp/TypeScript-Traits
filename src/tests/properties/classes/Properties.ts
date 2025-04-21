import ApplyTraits from "../../../applyTraits";
import PropertiesFile from "../traits/PropertiesFile";
import { PropertiesInstanceType } from "../types/types";

@ApplyTraits({}, PropertiesFile)
class Properties {
    get Instance() {
        return this as unknown as PropertiesInstanceType;
    }

    static create() {
        return new Properties().Instance;
    }
}

export default Properties;
