import { BaseServiceOrderItem } from '.';
export declare class ServiceOrderItemCustom extends BaseServiceOrderItem {
    uuid?: string;
    item: string;
    material?: string;
    colour?: string;
    profile?: string;
    width?: string;
    height?: string;
    depth?: string;
    constructor(data?: Partial<ServiceOrderItemCustom>);
}
export interface ServiceOrderItemCustomRelations {
}
export declare type ServiceOrderItemCustomWithRelations = ServiceOrderItemCustom & ServiceOrderItemCustomRelations;
