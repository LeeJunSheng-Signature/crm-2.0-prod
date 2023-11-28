import { FCOStatus, OCStatus, OrderState } from '../types/order-state.enum';
import { BaseEntity } from './base-entity.model';
import { Design, DesignWithRelations } from './design.model';
import { LeadWithRelations } from './lead.model';
import { PaymentAttachment, PaymentAttachmentWithRelations } from './payment-attachment.model';
export declare class FinalConfirmationOrder extends BaseEntity {
    uuid?: string;
    jobId?: number;
    quotationNumber?: string;
    state: OrderState;
    status: FCOStatus | OCStatus;
    remarks?: string;
    cancelRemark?: string;
    cancelReason?: string;
    paidAmount: number;
    paidAmountDeposit: number;
    propertySize?: number;
    deliveryAddress?: string;
    ocErpProcessedNew: boolean;
    ocErpPulledDeposit: boolean;
    ocErpProcessedDeposit: boolean;
    fcoErpProcessedProduction: boolean;
    designs: Design[];
    leadId: string;
    paymentAttachments: PaymentAttachment[];
    totalApprovedAmount: number;
    statusPaymentSlip?: string;
    constructor(data?: Partial<FinalConfirmationOrder>);
}
export interface FinalConfirmationOrderRelations {
    lead?: LeadWithRelations;
    design?: DesignWithRelations;
    attachment?: PaymentAttachmentWithRelations;
}
export declare type FinalConfirmationOrderWithRelations = FinalConfirmationOrder & FinalConfirmationOrderRelations;
