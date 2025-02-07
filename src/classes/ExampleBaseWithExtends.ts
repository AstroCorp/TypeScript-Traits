import ExampleBase from "./ExampleBase";

class ExampleBaseWithExtends extends ExampleBase {
    log() {
        return 'ExampleBaseWithExtends log';
    }
    
    serialize() {
        return 'ExampleBaseWithExtends serialize';
    }
}

export default ExampleBaseWithExtends;
