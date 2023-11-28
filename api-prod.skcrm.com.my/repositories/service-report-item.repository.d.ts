import { DefaultCrudRepository } from '@loopback/repository';
import { ServiceReportItem, ServiceReportItemRelations } from '../models';
import { MysqlDataSource } from '../datasources';
export declare class ServiceReportItemRepository extends DefaultCrudRepository<ServiceReportItem, typeof ServiceReportItem.prototype.uuid, ServiceReportItemRelations> {
    constructor(dataSource: MysqlDataSource);
}
