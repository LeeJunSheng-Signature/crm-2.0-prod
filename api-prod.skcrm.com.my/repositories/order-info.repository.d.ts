import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { OrderInfo, OrderInfoRelations, Design } from '../models';
import { DesignRepository } from './design.repository';
export declare class OrderInfoRepository extends DefaultCrudRepository<OrderInfo, typeof OrderInfo.prototype.uuid, OrderInfoRelations> {
    protected designRepositoryGetter: Getter<DesignRepository>;
    readonly design: BelongsToAccessor<Design, typeof OrderInfo.prototype.uuid>;
    constructor(dataSource: MysqlDataSource, designRepositoryGetter: Getter<DesignRepository>);
}
