import Example from "./classes/Example";
import ExampleBase from "./classes/ExampleBase";
import ExampleBaseWithExtends from "./classes/ExampleBaseWithExtends";
import ExampleWithResolve from "./classes/ExampleWithResolve";

describe('Traits', () =>{
    test('ExampleBase', () => {
        const instance = new ExampleBase();

        expect(instance.name).toBe('ExampleBase name');
        expect(instance.log()).toBe('ExampleBase log');
    });

    test('ExampleBaseWithExtends', () => {
        const instance = new ExampleBaseWithExtends();

        expect(instance.name).toBe('ExampleBase name');
        expect(instance.log()).toBe('ExampleBaseWithExtends log');
    });

    test('Example', () => {
        const instance = Example.create({
            name: 'Example name',
        });

        expect(instance.name).toBe('Example name');
        expect(instance.log()).toBe('Example log');
        expect(instance.serialize()).toBe('Serializable serialize');
    });

    test('ExampleWithError', async () => {
        await expect(async () => {
            const ExampleWithError = await import('./classes/ExampleWithError');

            ExampleWithError.default.create({
                name: 'ExampleWithError name',
            });
        }).rejects.toThrow('Method "log" already applied from trait "Logger"');
    });

    test('ExampleWithResolvet', async () => {
        const instance = ExampleWithResolve.create({
            name: 'ExampleWithResolve name',
        });

        expect(instance.name).toBe('ExampleWithResolve name');
    });
});
