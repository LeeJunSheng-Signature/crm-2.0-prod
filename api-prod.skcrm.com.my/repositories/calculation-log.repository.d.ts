import { DefaultCrudRepository } from '@loopback/repository';
import { CalculationLog, CalculationLogRelations } from '../models';
import { MysqlDataSource } from '../datasources';
export declare class CalculationLogRepository extends DefaultCrudRepository<CalculationLog, typeof CalculationLog.prototype.uuid, CalculationLogRelations> {
    constructor(dataSource: MysqlDataSource);
}
