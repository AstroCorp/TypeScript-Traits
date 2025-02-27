import ConflictsFixed from './classes/ConflictsFixed';

describe('Trait Conflicts', () => {
    test('should throw error when duplicate methods exist without resolution', async () => {
        await expect(async () => {
            const Conflicts = await import('./classes/Conflicts');

            Conflicts.default.create({
                name: 'Conflicts name',
            });
        }).rejects.toThrow('Method "log" already applied from trait "ConflictsLogger"');
    });

    test('should allow explicit conflict resolution', async () => {
        const conflictsFixed = ConflictsFixed.create({
            name: 'ConflictsFixed name',
        });

        expect(conflictsFixed.name).toBe('ConflictsFixed name');
        expect(conflictsFixed.log()).toBe('ConflictsLogger log');
        expect(conflictsFixed.debug()).toBe('ConflictsDebugger debug');
        expect(conflictsFixed.error()).toBe('ConflictsExceptions error');
    });
}); 