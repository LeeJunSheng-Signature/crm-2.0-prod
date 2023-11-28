import { Entity } from '@loopback/repository';
import { Material } from './material.model';
export declare class Item extends Entity {
    uuid?: string;
    category?: string;
    sub_category?: string;
    item_code: string;
    process_code?: string;
    uom?: string;
    fraction?: number;
    std_cost?: number;
    markup_rate?: number;
    part?: string;
    installation_charge?: string;
    dealer_price?: number;
    active?: boolean;
    materialId?: string;
    material?: Material;
    constructor(data?: Partial<Item>);
}
export interface ItemRelations {
}
export declare type ItemWithRelations = Item & ItemRelations;
