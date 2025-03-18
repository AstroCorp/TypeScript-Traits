import { Constructor, ResolveAs, ResolveInsteadOf, Settings } from "./types/types";

const hasOwnProperty = (target: Constructor, methodName: string, deep: boolean): boolean => {
    let currentTarget = target;

    if (!deep) {
        return currentTarget.prototype?.hasOwnProperty(methodName) || false;
    }

    while (currentTarget) {
        if (currentTarget.prototype?.hasOwnProperty(methodName)) {
            console.log('Found method in', currentTarget.name);
            return true;
        }

        currentTarget = Object.getPrototypeOf(currentTarget);
    }

    return false;
}

const validateResolve = (resolve: Array<ResolveInsteadOf | ResolveAs>) => {
    // Comprobamos que no haya dos reglas para el mismo método
    const appliedMethods = new Map<string, number>();

    resolve.forEach((rule) => {
        appliedMethods.set(rule.methodName, (appliedMethods.get(rule.methodName) ?? 0) + 1);
    });

    for (const [methodName, rules] of appliedMethods.entries()) {
        if (rules > 1) {
            throw new Error(`Multiple conflict resolution rules found for method "${methodName}". Please ensure there are no duplicate rules defined.`);
        }
    }
}

const ApplyTraits = <TBase extends Constructor>(settings: Settings, ...traits: Constructor[]): <T extends TBase>(Base: T) => T & InstanceType<typeof traits[number]> => {
    const resolve = settings.resolve || [];
    const showWarnings = settings.showWarnings || false;
    const appliedMethods = new Map<string, string>();

    validateResolve(resolve);

    return <T extends TBase>(Base: T): T & InstanceType<typeof traits[number]> => {
        traits.forEach((Trait) => {
            const traitName = Trait.name;
            const traitMethods = Object.getOwnPropertyNames(Trait.prototype);

            traitMethods.forEach((traitMethodName) => {
                if (traitMethodName === 'constructor') return;

                const currentClassHasMethod = hasOwnProperty(Base, traitMethodName, false);

                // La prioridad es Clase actual > Trait > Clase base, es decir, si la clase actual tiene el método, no se aplica el trait.
                // Por otro lado debemos comprobar que el método no se haya aplicado ya desde otro trait para evitar falsos positivos.
                if (currentClassHasMethod && !appliedMethods.has(traitMethodName)) {
                    if (showWarnings) {
                        console.warn(`Method ${traitMethodName} already exists in ${Base.name}`);
                    }

                    return;
                }

                if (showWarnings) {
                    const extendsClassHasMethod = hasOwnProperty(Base, traitMethodName, true);
                    
                    if (extendsClassHasMethod) {
                        console.warn(`Method ${traitMethodName} already exists in ${Base.name} or its parent classes`);
                    }
                }

                // Comprobamos el listado de resolución de conflictos.
                // Add -> Añadimos el método si no tiene resolución de conflictos o si la resolución determina que se debe añadir.
                // Rename -> Renombramos el método si en la resolución se indica que se debe renombrar.
                // Ignore -> Aquellos métodos que no sigan ninguna de las dos anteriores.
                const conflictResolution = resolve.find((conflictResolution) => conflictResolution.methodName === traitMethodName);
                const isRenameResolution = conflictResolution && 'newMethodName' in conflictResolution && conflictResolution.className === traitName && conflictResolution.methodName === traitMethodName;
                const isAddMethod = !conflictResolution || (!isRenameResolution && conflictResolution.className === traitName && conflictResolution.methodName === traitMethodName);

                // Si el método ya se ha aplicado desde otro trait, lanzamos un error.
                if (appliedMethods.has(traitMethodName) && isAddMethod) {
                    throw new Error(`Method "${traitMethodName}" already applied from trait "${appliedMethods.get(traitMethodName)}"`);
                }

                appliedMethods.set(traitMethodName, Trait.name);

                // Solo aplicamos el método si no se ha ignorado durante la resolución de conflictos.
                if (isAddMethod || isRenameResolution) {
                    const methodName = isRenameResolution ? conflictResolution.newMethodName : traitMethodName;

                    Object.defineProperty(
                        Base.prototype,
                        methodName,
                        Object.getOwnPropertyDescriptor(Trait.prototype, traitMethodName) || Object.create(null)
                    );
                }
            });
        });

        return Base as T & InstanceType<typeof traits[number]>;
    };
};

export default ApplyTraits;
