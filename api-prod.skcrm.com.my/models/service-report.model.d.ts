import { BaseEntity } from '.';
import { PaymentAttachment } from './payment-attachment.model';
import { ServiceReportState } from '../types/service-report-state.enum';
import { ServiceReportType } from '../types/service-report-types.enum';
import { ServiceOrderItemCustom } from './service-order-item-custom.model';
import { ServiceOrderItem } from './service-order-item.model';
export declare class ServiceReport extends BaseEntity {
    uuid?: string;
    LogNumber: string;
    type: ServiceReportType;
    state: ServiceReportState;
    stateSequence: string[];
    installer: string;
    installedDate: Date;
    jobNumber: string;
    maintenanceReportJobNumber: string;
    remarks: string;
    remarksSalesConsultant: string;
    remarksDetailer: string;
    count: number;
    processedAt?: Date;
    submittedAt?: Date;
    leadManualInput: {
        name: string;
        siteAddress: string;
        phone: string;
    };
    leadId: string;
    attachments: PaymentAttachment[];
    userId: string;
    items: ServiceOrderItem[];
    customItems: ServiceOrderItemCustom[];
    constructor(data?: Partial<ServiceReport>);
}
export interface ServiceReportRelations {
}
export declare type ServiceReportWithRelations = ServiceReport & ServiceReportRelations;
