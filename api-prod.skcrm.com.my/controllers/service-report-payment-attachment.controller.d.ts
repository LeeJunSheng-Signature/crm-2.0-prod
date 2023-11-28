import { Count, Filter, Where } from '@loopback/repository';
import { ServiceReport, PaymentAttachment } from '../models';
import { ServiceReportRepository } from '../repositories';
export declare class ServiceReportPaymentAttachmentController {
    protected serviceReportRepository: ServiceReportRepository;
    constructor(serviceReportRepository: ServiceReportRepository);
    find(id: string, filter?: Filter<PaymentAttachment>): Promise<PaymentAttachment[]>;
    create(id: typeof ServiceReport.prototype.uuid, paymentAttachment: Omit<PaymentAttachment, 'uuid'>): Promise<PaymentAttachment>;
    patch(id: string, paymentAttachment: Partial<PaymentAttachment>, where?: Where<PaymentAttachment>): Promise<Count>;
    delete(id: string, where?: Where<PaymentAttachment>): Promise<Count>;
}
