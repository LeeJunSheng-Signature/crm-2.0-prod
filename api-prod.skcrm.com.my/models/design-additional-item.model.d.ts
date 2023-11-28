import { Entity } from '@loopback/repository';
import { DesignWithRelations } from './design.model';
import { TradingItemWithRelations } from './trading-item.model';
export declare class DesignAdditionalItem extends Entity {
    uuid?: string;
    quantity: number;
    discount: number;
    designId: string;
    tradingItemId: string;
    constructor(data?: Partial<DesignAdditionalItem>);
}
export interface DesignAdditionalItemRelations {
    tradingItem?: TradingItemWithRelations;
    design?: DesignWithRelations;
}
export declare type DesignAdditionalItemWithRelations = DesignAdditionalItem & DesignAdditionalItemRelations;
