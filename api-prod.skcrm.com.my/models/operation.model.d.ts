import { BaseEntity } from '.';
export declare class Operation extends BaseEntity {
    uuid?: string;
    name: string;
    constructor(data?: Partial<Operation>);
}
export interface OperationRelations {
}
export declare type OperationWithRelations = Operation & OperationRelations;
