import { Count, Filter, Where } from '@loopback/repository';
import { FinalConfirmationOrder, PaymentAttachment } from '../models';
import { FinalConfirmationOrderRepository } from '../repositories';
import { FileService } from './../services';
export declare class FinalConfirmationOrderPaymentAttachmentController {
    protected finalConfirmationOrderRepository: FinalConfirmationOrderRepository;
    protected fileService: FileService;
    constructor(finalConfirmationOrderRepository: FinalConfirmationOrderRepository, fileService: FileService);
    find(id: string, filter?: Filter<PaymentAttachment>): Promise<PaymentAttachment[]>;
    create(id: typeof FinalConfirmationOrder.prototype.uuid, paymentAttachment: Omit<PaymentAttachment, 'uuid'>): Promise<PaymentAttachment>;
    patch(id: string, auuid: string, paymentAttachment: Partial<PaymentAttachment>, where?: Where<PaymentAttachment>): Promise<Count>;
    delete(id: typeof FinalConfirmationOrder.prototype.uuid, paymentAttachment: Partial<PaymentAttachment>): Promise<Count>;
}
