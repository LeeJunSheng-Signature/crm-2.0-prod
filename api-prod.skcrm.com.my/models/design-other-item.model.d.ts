import { BaseEntity } from '.';
import { DesignRelations } from './design.model';
export declare class DesignOtherItem extends BaseEntity {
    uuid?: string;
    quantity: number;
    UOM: string;
    name: string;
    description: string;
    unitPrice: number;
    discount: number;
    discountedPrice: number;
    designId: string;
    [prop: string]: any;
    constructor(data?: Partial<DesignOtherItem>);
}
export interface DesignOtherItemRelations {
    design?: DesignRelations;
}
export declare type DesignOtherItemWithRelations = DesignOtherItem & DesignOtherItemRelations;
