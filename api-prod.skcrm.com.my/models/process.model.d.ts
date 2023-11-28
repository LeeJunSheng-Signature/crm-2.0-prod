import { Entity } from '@loopback/repository';
export declare class Process extends Entity {
    uuid?: string;
    systemCode: string;
    productionCode?: string;
    description?: string;
    uom?: string;
    rate?: number;
    constructor(data?: Partial<Process>);
}
export interface ProcessRelations {
}
export declare type ProcessWithRelations = Process & ProcessRelations;
