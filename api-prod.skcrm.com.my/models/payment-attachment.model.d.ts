import { BaseEntity } from '.';
import { PaymentOptions } from './payment-options.model';
export declare class PaymentAttachment extends BaseEntity {
    uuid?: string;
    fileName: string;
    name: string;
    finalConfirmationOrderId: string;
    serviceReportId?: string;
    type?: string;
    status?: string;
    approvedAmount: number;
    chequeNo?: string;
    paymentOptionsId?: string;
    paymentOptions: PaymentOptions;
    constructor(data?: Partial<PaymentAttachment>);
}
export interface PaymentAttachmentRelations {
}
export declare type PaymentAttachmentWithRelations = PaymentAttachment & PaymentAttachmentRelations;
