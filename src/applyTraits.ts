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
    const appliedMethods = new Map<string, string[]>();

    resolve.forEach((rule) => {
        if (!appliedMethods.has(rule.methodName)) {
            appliedMethods.set(rule.methodName, []);
        }
        
        const formatedRule = 'otherClasses' in rule
            ? `${rule.className}::${rule.methodName} instead of ${rule.otherClasses.join(', ')}`
            : `${rule.className}::${rule.methodName} as ${rule.newMethodName}`;

        appliedMethods.get(rule.methodName)?.push(formatedRule);
    });

    for (const [methodName, rules] of appliedMethods.entries()) {
        if (rules.length > 1) {
            throw new Error(`Conflicts found in conflict resolution for method "${methodName}": ${rules.join(', ')}`);
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
                let conflictStatus = 'merge';

                resolve
                    .filter((conflictResolution) => conflictResolution.methodName === traitMethodName)
                    .forEach((conflictResolution) => {
                        // ResolveInsteadOf
                        if ('otherClasses' in conflictResolution) {
                            const { className, methodName, otherClasses } = conflictResolution;

                            if (traitName !== className) {
                                conflictStatus = 'ignore';
                            }
                        }

                        // ResolveAs
                        if ('newMethodName' in conflictResolution) {
                            const { className, methodName, newMethodName } = conflictResolution;

                            if (traitName === className) {
                                traitMethodName = newMethodName;
                                conflictStatus = 'replace';
                            }
                        }
                    })

                // Si el método ya se ha aplicado desde otro trait, lanzamos un error.
                if (appliedMethods.has(traitMethodName) && conflictStatus !== 'ignore') {
                    throw new Error(`Method "${traitMethodName}" already applied from trait "${appliedMethods.get(traitMethodName)}"`);
                }

                appliedMethods.set(traitMethodName, Trait.name);

                // Solo aplicamos el método si no se ha ignorado durante la resolución de conflictos.
                if (conflictStatus !== 'ignore') {
                    Object.defineProperty(
                        Base.prototype,
                        traitMethodName,
                        Object.getOwnPropertyDescriptor(Trait.prototype, traitMethodName) || Object.create(null)
                    );
                }
            });
        });

        return Base as T & InstanceType<typeof traits[number]>;
    };
};

export default ApplyTraits;
