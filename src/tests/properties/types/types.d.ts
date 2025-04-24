import Properties from "../classes/Properties";
import PropertiesWithError from "../classes/PropertiesWIthError";
import PropertiesFile from "../traits/PropertiesFile";

export type PropertiesInstanceType = Properties & PropertiesFile;

export type PropertiesWithErrorInstanceType = PropertiesWithError & PropertiesFile;
