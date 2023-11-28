import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { ServiceOrderItem, ServiceOrderItemRelations, ServiceReportItem, ServiceReportMaterial } from '../models';
import { MysqlDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { ServiceReportItemRepository } from './service-report-item.repository';
import { ServiceReportMaterialRepository } from './service-report-material.repository';
export declare class ServiceOrderItemRepository extends DefaultCrudRepository<ServiceOrderItem, typeof ServiceOrderItem.prototype.uuid, ServiceOrderItemRelations> {
    protected serviceReportItemRepositoryGetter: Getter<ServiceReportItemRepository>;
    protected serviceReportMaterialRepositoryGetter: Getter<ServiceReportMaterialRepository>;
    readonly item: BelongsToAccessor<ServiceReportItem, typeof ServiceOrderItem.prototype.uuid>;
    readonly material: BelongsToAccessor<ServiceReportMaterial, typeof ServiceOrderItem.prototype.uuid>;
    constructor(dataSource: MysqlDataSource, serviceReportItemRepositoryGetter: Getter<ServiceReportItemRepository>, serviceReportMaterialRepositoryGetter: Getter<ServiceReportMaterialRepository>);
}
