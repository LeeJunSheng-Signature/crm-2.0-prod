import { DefaultCrudRepository } from '@loopback/repository';
import { ServiceOrderItemCustom, ServiceOrderItemCustomRelations } from '../models';
import { MysqlDataSource } from '../datasources';
export declare class ServiceOrderItemCustomRepository extends DefaultCrudRepository<ServiceOrderItemCustom, typeof ServiceOrderItemCustom.prototype.uuid, ServiceOrderItemCustomRelations> {
    constructor(dataSource: MysqlDataSource);
}
