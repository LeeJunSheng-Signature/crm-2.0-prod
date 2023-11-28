import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasOneRepositoryFactory } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { PaymentAttachment, PaymentAttachmentRelations, PaymentOptions } from '../models';
import { PaymentOptionsRepository } from './payment-options.repository';
export declare class PaymentAttachmentRepository extends DefaultCrudRepository<PaymentAttachment, typeof PaymentAttachment.prototype.uuid, PaymentAttachmentRelations> {
    protected paymentOptionsRepositoryGetter: Getter<PaymentOptionsRepository>;
    readonly paymentOptions: HasOneRepositoryFactory<PaymentOptions, typeof PaymentAttachment.prototype.uuid>;
    constructor(dataSource: MysqlDataSource, paymentOptionsRepositoryGetter: Getter<PaymentOptionsRepository>);
}
