import { Count, Filter, Where } from '@loopback/repository';
import { PaymentAttachment, PaymentOptions } from '../models';
import { PaymentAttachmentRepository } from '../repositories';
export declare class PaymentAttachmentPaymentOptionsController {
    protected paymentAttachmentRepository: PaymentAttachmentRepository;
    constructor(paymentAttachmentRepository: PaymentAttachmentRepository);
    get(id: string, filter?: Filter<PaymentOptions>): Promise<PaymentOptions>;
    create(id: typeof PaymentAttachment.prototype.uuid, paymentOptions: Omit<PaymentOptions, 'uuid'>): Promise<PaymentOptions>;
    patch(id: string, paymentOptions: Partial<PaymentOptions>, where?: Where<PaymentOptions>): Promise<Count>;
    delete(id: string, where?: Where<PaymentOptions>): Promise<Count>;
}
