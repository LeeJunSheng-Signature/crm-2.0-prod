import { BaseEntity } from '.';
export declare class Module extends BaseEntity {
    uuid?: string;
    name: string;
    constructor(data?: Partial<Module>);
}
export interface ModuleRelations {
}
export declare type ModuleWithRelations = Module & ModuleRelations;
