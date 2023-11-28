import { Entity } from '@loopback/repository';
import { ItemWithRelations } from './item.model';
export declare class Material extends Entity {
    uuid?: string;
    color_code?: string;
    brand?: string;
    showInCrm: string;
    profile?: string;
    price?: number;
    constructor(data?: Partial<Material>);
}
export interface MaterialRelations {
    item?: ItemWithRelations;
}
export declare type MaterialWithRelations = Material & MaterialRelations;
