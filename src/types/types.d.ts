import ExampleWithError from "../classes/ExampleWithError";
import CustomLog from "../traits/customLog";

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

export interface ExampleDTO {
    name: string;
}

export type ExampleInstanceType = Example & Logger & Serializable;

export type ExampleWithErrorInstanceType = ExampleWithError & Logger & CustomLog;

export type ExampleWithResolveInstanceType = ExampleWIthResolve & Logger & CustomLog;
