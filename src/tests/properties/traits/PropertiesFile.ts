class PropertiesFile {
    #filename: string;

    getFilename() {
        return this.#filename;
    }

    setFilename(filename: string) {
        this.#filename = filename;
    }

    set filename(filename: string) {
        this.#filename = filename;
    }

    get filename() {
        return this.#filename;
    }
}

export default PropertiesFile;
