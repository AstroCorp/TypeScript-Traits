class VisibilityLogger {
    private fakePrivateMethod(name: string) {
        return `ConflictsDebugger fakePrivateMethod ${name}`;
    }

    #realPrivateMethod(name: string) {
        return `ConflictsDebugger realPrivateMethod ${name}`;
    }

    public publicMethod() {
        return 'VisibilityLogger publicMethod';
    }

    protected protectedMethod() {
        return 'VisibilityLogger protectedMethod';
    }

    privateMethod() {
        return 'VisibilityLogger privateMethod';
    }

    static staticMethod(name: string, age: number) {
        return `VisibilityLogger staticMethod ${name} - ${age}`;
    }
}

export default VisibilityLogger;
