import { BaseEntity } from '.';
export declare class ServiceReportItem extends BaseEntity {
    uuid?: string;
    category: string;
    subcategory: string;
    name: string;
    itemcode: string;
    brand?: string;
    material?: string;
    colour?: string;
    profile?: string;
    uom: string;
    stdcost: number;
    markuprate: number;
    dealerprice: number;
    active: string;
    oversea: boolean;
    overseaDealerPrice?: number;
    SMPrice?: number;
    serviceOrderItemId?: string;
    isCategory(category: string): boolean;
    isSubcategory(subcategory: string): boolean;
    isCategoryIn(categories: string[]): boolean;
    isSubcategoryIn(subcategories: string[]): boolean;
    constructor(data?: Partial<ServiceReportItem>);
}
export interface ServiceReportItemRelations {
}
export declare type ServiceReportItemWithRelations = ServiceReportItem & ServiceReportItemRelations;
