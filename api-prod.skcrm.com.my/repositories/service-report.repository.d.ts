import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor, HasManyRepositoryFactory } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { ServiceReport, ServiceReportRelations, Lead, PaymentAttachment, User, ServiceOrderItemCustom, ServiceOrderItem } from '../models';
import { LeadRepository } from './lead.repository';
import { PaymentAttachmentRepository } from './payment-attachment.repository';
import { UserRepository } from './user.repository';
import { ServiceOrderItemCustomRepository } from './service-order-item-custom.repository';
import { ServiceOrderItemRepository } from './service-order-item.repository';
export declare class ServiceReportRepository extends DefaultCrudRepository<ServiceReport, typeof ServiceReport.prototype.uuid, ServiceReportRelations> {
    protected leadRepositoryGetter: Getter<LeadRepository>;
    protected paymentAttachmentRepositoryGetter: Getter<PaymentAttachmentRepository>;
    protected userRepositoryGetter: Getter<UserRepository>;
    protected serviceOrderItemCustomRepositoryGetter: Getter<ServiceOrderItemCustomRepository>;
    protected serviceOrderItemRepositoryGetter: Getter<ServiceOrderItemRepository>;
    readonly lead: BelongsToAccessor<Lead, typeof ServiceReport.prototype.uuid>;
    readonly attachments: HasManyRepositoryFactory<PaymentAttachment, typeof ServiceReport.prototype.uuid>;
    readonly submitter: BelongsToAccessor<User, typeof ServiceReport.prototype.uuid>;
    readonly customItems: HasManyRepositoryFactory<ServiceOrderItemCustom, typeof ServiceReport.prototype.uuid>;
    readonly items: HasManyRepositoryFactory<ServiceOrderItem, typeof ServiceReport.prototype.uuid>;
    constructor(dataSource: MysqlDataSource, leadRepositoryGetter: Getter<LeadRepository>, paymentAttachmentRepositoryGetter: Getter<PaymentAttachmentRepository>, userRepositoryGetter: Getter<UserRepository>, serviceOrderItemCustomRepositoryGetter: Getter<ServiceOrderItemCustomRepository>, serviceOrderItemRepositoryGetter: Getter<ServiceOrderItemRepository>);
}
