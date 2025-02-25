export type Constructor<T = {}> = new (...args: any[]) => T;

export interface ResolveInsteadOf {
    className: string;
    methodName: string;
    otherClasses: string[];
}

export interface ResolveAs {
    className: string;
    methodName: string;
    newMethodName: string;
}

export interface Settings {
    resolve?: Array<ResolveInsteadOf | ResolveAs>;
    showWarnings?: boolean;
}
