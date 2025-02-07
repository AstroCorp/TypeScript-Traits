import Example from "./classes/Example";
import ExampleBase from "./classes/ExampleBase";
import ExampleBaseWithExtends from "./classes/ExampleBaseWithExtends";

describe('Traits', () =>{
    test('ExampleBase', () =>{
        const instance = new ExampleBase();

        expect(instance.name).toBe('ExampleBase name');
        expect(instance.log()).toBe('ExampleBase log');
    });

    test('ExampleBaseWithExtends', () =>{
        const instance = new ExampleBaseWithExtends();

        expect(instance.name).toBe('ExampleBase name');
        expect(instance.log()).toBe('ExampleBaseWithExtends log');
    });

    test('Example', () =>{
        const instance = new Example({
            name: 'Example name',
        });

        expect(instance.name).toBe('Example name');
        expect(instance.log()).toBe('Example log');
        expect(instance.serialize()).toBe('Serializable serialize');
    });
});
