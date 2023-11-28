import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { PaymentOptions, PaymentOptionsRelations } from '../models';
export declare class PaymentOptionsRepository extends DefaultCrudRepository<PaymentOptions, typeof PaymentOptions.prototype.uuid, PaymentOptionsRelations> {
    constructor(dataSource: MysqlDataSource);
}
