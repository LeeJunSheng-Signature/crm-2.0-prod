import { DefaultCrudRepository } from '@loopback/repository';
import { Operation, OperationRelations } from '../models';
import { MysqlDataSource } from '../datasources';
export declare class OperationRepository extends DefaultCrudRepository<Operation, typeof Operation.prototype.uuid, OperationRelations> {
    constructor(dataSource: MysqlDataSource);
}
