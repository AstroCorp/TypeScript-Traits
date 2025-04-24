import Properties from "./classes/Properties";

describe.skip('Properties in Traits', () => {
    test.only('should not allow redefining trait property with different visibility', () => {
        const properties = Properties.create();

        properties.setFilename('test.txt');

        expect(properties.getFilename()).toBe('test.txt');
    });

    test('should not allow redefining trait property with different initial value', () => {
        // TODO: Implement test
    });

    test('should allow redefining property with same visibility and initial value', () => {
        // TODO: Implement test
    });
}); 