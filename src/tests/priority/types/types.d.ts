import PriorityExample1 from "../classes/PriorityExample1";
import PriorityExample2 from "../classes/PriorityExample2";
import PriorityLogger from "../traits/PriorityLogger";

export interface PriorityExample1DTO {
    name: string;
}

export type PriorityExample1InstanceType = PriorityExample1 & PriorityLogger;

export interface PriorityExample2DTO {
    name: string;
}

export type PriorityExample2InstanceType = PriorityExample2 & PriorityLogger;
