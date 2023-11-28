import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { Design, FinalConfirmationOrder, FinalConfirmationOrderRelations, Lead, PaymentAttachment } from '../models';
import { DesignRepository } from './design.repository';
import { LeadRepository } from './lead.repository';
import { PaymentAttachmentRepository } from './payment-attachment.repository';
export declare class FinalConfirmationOrderRepository extends DefaultCrudRepository<FinalConfirmationOrder, typeof FinalConfirmationOrder.prototype.uuid, FinalConfirmationOrderRelations> {
    protected designRepositoryGetter: Getter<DesignRepository>;
    protected leadRepositoryGetter: Getter<LeadRepository>;
    protected paymentAttachmentRepositoryGetter: Getter<PaymentAttachmentRepository>;
    readonly designs: HasManyRepositoryFactory<Design, typeof FinalConfirmationOrder.prototype.uuid>;
    readonly lead: BelongsToAccessor<Lead, typeof FinalConfirmationOrder.prototype.uuid>;
    readonly paymentAttachments: HasManyRepositoryFactory<PaymentAttachment, typeof FinalConfirmationOrder.prototype.uuid>;
    constructor(dataSource: MysqlDataSource, designRepositoryGetter: Getter<DesignRepository>, leadRepositoryGetter: Getter<LeadRepository>, paymentAttachmentRepositoryGetter: Getter<PaymentAttachmentRepository>);
}
