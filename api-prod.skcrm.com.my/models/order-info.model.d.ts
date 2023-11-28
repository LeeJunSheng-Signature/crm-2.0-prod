import { Entity } from '@loopback/repository';
export declare class OrderInfo extends Entity {
    uuid: string;
    customerName?: string;
    customerTelephone?: string;
    orderCode?: string;
    currentNodeKey?: string;
    createTime?: string;
    obsDesignerUserId?: string;
    designerName?: string;
    storeName?: string;
    designId: string;
    constructor(data?: Partial<OrderInfo>);
}
export interface OrderInfoRelations {
}
export declare type OrderInfoWithRelations = OrderInfo & OrderInfoRelations;
