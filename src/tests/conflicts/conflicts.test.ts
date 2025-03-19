import ConflictsFixedWithAs from './classes/ConflictsFixedWithAs';
import ConflictsFixedWithInsteadOf from './classes/ConflictsFixedWithInsteadOf';

describe('Trait Conflicts', () => {
    test('should throw error when duplicate methods exist without resolution', async () => {
        await expect(async () => {
            const Conflicts = await import('./classes/Conflicts');

            Conflicts.default.create({
                name: 'Conflicts name',
            });
        }).rejects.toThrow('Method "log" already applied from trait "ConflictsLogger"');
    });

    test('should allow explicit conflict resolution with InsteadOf', async () => {
        const conflictsFixedWithInsteadOf = ConflictsFixedWithInsteadOf.create({
            name: 'ConflictsFixedWithInsteadOf name',
        });

        expect(conflictsFixedWithInsteadOf.name).toBe('ConflictsFixedWithInsteadOf name');
        expect(conflictsFixedWithInsteadOf.log()).toBe('ConflictsLogger log');
        expect(conflictsFixedWithInsteadOf.debug()).toBe('ConflictsDebugger debug');
        expect(conflictsFixedWithInsteadOf.error()).toBe('ConflictsExceptions error');
    });

    test('should allow explicit conflict resolution with As', async () => {
        const conflictsFixedWithAs = ConflictsFixedWithAs.create({
            name: 'ConflictsFixedWithAs name',
        });

        expect(conflictsFixedWithAs.name).toBe('ConflictsFixedWithAs name');
        expect(conflictsFixedWithAs.log()).toBe('ConflictsLogger log');
        expect(conflictsFixedWithAs.error()).toBe('ConflictsExceptions error');
        expect(conflictsFixedWithAs.debug()).toBe('ConflictsDebugger debug');
        expect(conflictsFixedWithAs.debugRenamed()).toBe('ConflictsExceptions debug');
    });
}); 