import { Entity } from '@loopback/repository';
export declare class ItemList extends Entity {
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
    puom?: string;
    suom?: string;
    fraction?: number;
    stdcost?: number;
    markuprate?: number;
    part?: string;
    nonstdrate?: number;
    installationcharges?: number;
    dealerprice?: number;
    active: string;
    oversea?: string;
    overseadealerprice?: number;
    constructor(data?: Partial<ItemList>);
}
export interface ItemListRelations {
}
export declare type ItemListWithRelations = ItemList & ItemListRelations;
