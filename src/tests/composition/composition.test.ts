import Composition from "./classes/Composition";

describe('Trait Composition', () => {
    test('should maintain functionality of all combined traits', () => {
        const composition = Composition.create();
        expect(composition.sum(1, 2)).toBe(3);
        expect(composition.sub(1, 2)).toBe(-1);
        expect(composition.log('Hello')).toEqual('Hello');
    });
});
