import { BaseEntity } from '.';
export declare class MissingItem extends BaseEntity {
    uuid?: string;
    name: string;
    brandGoodName: string;
    productNumber?: string;
    drawingNumber: string;
    constructor(data?: Partial<MissingItem>);
}
export interface MissingItemRelations {
}
export declare type MissingItemWithRelations = MissingItem & MissingItemRelations;
