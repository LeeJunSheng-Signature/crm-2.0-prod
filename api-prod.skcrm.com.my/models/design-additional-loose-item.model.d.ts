import { Entity } from '@loopback/repository';
import { DesignRelations } from './design.model';
import { LooseItemWithRelations } from './loose-item.model';
export declare class DesignAdditionalLooseItem extends Entity {
    uuid?: string;
    quantity: number;
    discount: number;
    designId: string;
    looseItemId: string;
    constructor(data?: Partial<DesignAdditionalLooseItem>);
}
export interface DesignAdditionalLooseItemRelations {
    looseItem?: LooseItemWithRelations;
    design?: DesignRelations;
}
export declare type DesignAdditionalLooseItemWithRelations = DesignAdditionalLooseItem & DesignAdditionalLooseItemRelations;
