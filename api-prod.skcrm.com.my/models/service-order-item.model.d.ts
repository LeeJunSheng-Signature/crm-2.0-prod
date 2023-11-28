import { BaseServiceOrderItem } from '.';
export declare class ServiceOrderItem extends BaseServiceOrderItem {
    uuid?: string;
    SMPrice: number;
    width: string;
    height: string;
    depth: string;
    serviceReportItemId: string;
    serviceReportMaterialId: string;
    constructor(data?: Partial<ServiceOrderItem>);
}
export interface ServiceOrderItemRelations {
}
export declare type ServiceOrderItemWithRelations = ServiceOrderItem & ServiceOrderItemRelations;
