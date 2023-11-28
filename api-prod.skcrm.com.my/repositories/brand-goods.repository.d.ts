import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { BrandGoods, BrandGoodsRelations, Design } from '../models';
import { DesignRepository } from './design.repository';
export declare class BrandGoodsRepository extends DefaultCrudRepository<BrandGoods, typeof BrandGoods.prototype.uuid, BrandGoodsRelations> {
    protected designRepositoryGetter: Getter<DesignRepository>;
    readonly design: BelongsToAccessor<Design, typeof BrandGoods.prototype.uuid>;
    constructor(dataSource: MysqlDataSource, designRepositoryGetter: Getter<DesignRepository>);
}
