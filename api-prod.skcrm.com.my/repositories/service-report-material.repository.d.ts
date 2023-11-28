import { DefaultCrudRepository } from '@loopback/repository';
import { ServiceReportMaterial, ServiceReportMaterialRelations } from '../models';
import { MysqlDataSource } from '../datasources';
export declare class ServiceReportMaterialRepository extends DefaultCrudRepository<ServiceReportMaterial, typeof ServiceReportMaterial.prototype.uuid, ServiceReportMaterialRelations> {
    constructor(dataSource: MysqlDataSource);
}
