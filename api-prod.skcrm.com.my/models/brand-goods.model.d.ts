import { Entity } from '@loopback/repository';
export declare class BrandGoods extends Entity {
    uuid: string;
    obsBrandGoodId?: string;
    brandGoodName?: string;
    brandName?: string;
    obsAccountId?: string;
    designId: string;
    constructor(data?: Partial<BrandGoods>);
}
export interface BrandGoodsRelations {
}
export declare type BrandGoodsWithRelations = BrandGoods & BrandGoodsRelations;
