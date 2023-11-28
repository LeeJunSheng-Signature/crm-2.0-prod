import { Entity } from '@loopback/repository';
import { DesignAdditionalItem, DesignAdditionalItemWithRelations } from './design-additional-item.model';
import { DesignWithRelations } from './design.model';
export declare class TradingItem extends Entity {
    uuid?: string;
    category?: string;
    subcategory?: string;
    name?: string;
    itemcode?: string;
    virture?: string;
    brand?: string;
    material?: string;
    colour?: string;
    profile?: string;
    uom?: string;
    fraction?: string;
    stdcost?: number;
    markuprate?: number;
    part?: string;
    nonstdrate?: number;
    installationCharges?: number;
    dealerprice?: number;
    active: string;
    oversea?: string;
    overseaDealerPrice?: number;
    designId: string;
    designAdditionalItems: DesignAdditionalItem[];
    constructor(data?: Partial<TradingItem>);
}
export interface TradingItemRelations {
    design?: DesignAdditionalItemWithRelations;
    designAdditionalItems?: DesignWithRelations;
}
export declare type TradingItemWithRelations = TradingItem & TradingItemRelations;
