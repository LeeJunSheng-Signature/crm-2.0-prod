import { BaseEntity } from '.';
export declare class PaymentOptions extends BaseEntity {
    uuid?: string;
    paymentDescription: string;
    paymentType: string;
    paymentActive: string;
    constructor(data?: Partial<PaymentOptions>);
}
export interface PaymentOptionsRelations {
}
export declare type PaymentOptionsWithRelations = PaymentOptions & PaymentOptionsRelations;
