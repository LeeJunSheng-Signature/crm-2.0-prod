import { BaseEntity } from '.';
export declare class ServiceReportMaterial extends BaseEntity {
    uuid?: string;
    material: string;
    colour?: string;
    profile?: string;
    price: number;
    serviceOrderItemId?: string;
    constructor(data?: Partial<ServiceReportMaterial>);
}
export interface ServiceReportMaterialRelations {
}
export declare type ServiceReportMaterialWithRelations = ServiceReportMaterial & ServiceReportMaterialRelations;
