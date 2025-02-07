import { Constructor, Settings } from "../types/types";

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


const ApplyTraits = <TBase extends Constructor>(settings: Settings, ...traits: Constructor[]): <T extends TBase>(Base: T) => T & InstanceType<typeof traits[number]> => {
    const resolve = settings.resolve || [];
    const showWarnings = settings.showWarnings || false;

    return <T extends TBase>(Base: T): T & InstanceType<typeof traits[number]> => {
        traits.forEach((Trait) => {
            Object.getOwnPropertyNames(Trait.prototype).forEach((methodName) => {
                if (methodName === 'constructor') return;

                const currentClassHasMethod = hasOwnProperty(Base, methodName, false);

                if (currentClassHasMethod) {
                    if (showWarnings) {
                        console.warn(`Method ${methodName} already exists in ${Base.name}`);
                    }

                    return;
                }

                if (showWarnings) {
                    const extendsClassHasMethod = hasOwnProperty(Base, methodName, true);
                    
                    if (extendsClassHasMethod) {
                        console.warn(`Method ${methodName} already exists in ${Base.name} or its parent classes`);
                    }
                }

                Object.defineProperty(
                    Base.prototype,
                    methodName,
                    Object.getOwnPropertyDescriptor(Trait.prototype, methodName) || Object.create(null)
                );
            });
        });

        return Base as T & InstanceType<typeof traits[number]>;
    };
};

export default ApplyTraits;
