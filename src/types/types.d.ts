export type Constructor<T = {}> = new (...args: any[]) => T;

interface ResolveInsteadOf {
    class: string;
    method: string;
    otherClasses: string[];
}

interface ResolveAs {
    class: string;
    method: string;
    newMethodName: string;
}

export interface Settings {
    resolve?: ResolveInsteadOf | ResolveAs[];
    showWarnings?: boolean;
}

export interface ExampleDTO {
    name: string;
}

export type ExampleInstanceType = Example & Logger & Serializable;
