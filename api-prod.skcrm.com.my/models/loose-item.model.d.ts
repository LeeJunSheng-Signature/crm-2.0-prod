import { Entity } from '@loopback/repository';
import { DesignAdditionalLooseItem, DesignAdditionalLooseItemWithRelations } from './design-additional-loose-item.model';
import { DesignWithRelations } from './design.model';
export declare class LooseItem extends Entity {
    uuid?: string;
    category?: string;
    subcategory?: string;
    name?: string;
    itemcode?: string;
    processcode?: string;
    virture?: string;
    brand?: string;
    material?: string;
    colour?: string;
    profile?: string;
    puom?: string;
    suom?: string;
    fraction?: number;
    stdcost?: number;
    markuprate: number;
    part?: string;
    nonstdrate?: number;
    installationcharges?: number;
    dealerprice?: number;
    active: string;
    oversea?: string;
    overseadealerprice?: number;
    designId: string;
    designAdditionalLooseItems: DesignAdditionalLooseItem[];
    constructor(data?: Partial<LooseItem>);
}
export interface LooseItemRelations {
    design?: DesignAdditionalLooseItemWithRelations;
    designAdditionalLooseItems?: DesignWithRelations;
}
export declare type LooseItemWithRelations = LooseItem & LooseItemRelations;
