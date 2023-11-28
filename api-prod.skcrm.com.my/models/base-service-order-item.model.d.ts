import { BaseEntity } from '.';
export declare abstract class BaseServiceOrderItem extends BaseEntity {
    quantity: number;
    rootCause?: string;
    reason?: string;
    subReason?: string;
    party?: string;
    remarks?: string;
    remarksFactory?: string;
    serviceReportId?: string;
    unitPrice: number;
    amount: number;
    constructor(data?: Partial<BaseServiceOrderItem>);
}
