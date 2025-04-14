import Composition from "./classes/Composition";
import CompositionWithConflicts from "./classes/CompositionWithConflicts";

describe('Trait Composition', () => {
    test('should allow creating a trait by combining other traits', () => {
        const composition = Composition.create();
        
        expect(composition.sum(1, 2)).toBe(3);
        expect(composition.sub(1, 2)).toBe(-1);
        expect(composition.log('Hello')).toEqual('Hello');
    });

    test('should maintain functionality of all combined traits', () => {
        const composition = CompositionWithConflicts.create();

        expect(composition.sum(1, 2)).toBe(3);
        expect(composition.sub(1, 2)).toBe(-1);
        expect(composition.log('Hello')).toEqual('Hello');
        expect(composition.debug()).toEqual('CompositionDebugger debug');
    });
});
