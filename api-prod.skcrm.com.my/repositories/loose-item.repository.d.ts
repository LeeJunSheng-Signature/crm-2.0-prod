import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor, HasManyRepositoryFactory } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { LooseItem, LooseItemRelations, Design, DesignAdditionalLooseItem } from '../models';
import { DesignRepository } from './design.repository';
import { DesignAdditionalLooseItemRepository } from './design-additional-loose-item.repository';
export declare class LooseItemRepository extends DefaultCrudRepository<LooseItem, typeof LooseItem.prototype.uuid, LooseItemRelations> {
    protected designRepositoryGetter: Getter<DesignRepository>;
    protected designAdditionalLooseItemRepositoryGetter: Getter<DesignAdditionalLooseItemRepository>;
    readonly design: BelongsToAccessor<Design, typeof LooseItem.prototype.uuid>;
    readonly designAdditionalLooseItems: HasManyRepositoryFactory<DesignAdditionalLooseItem, typeof LooseItem.prototype.uuid>;
    constructor(dataSource: MysqlDataSource, designRepositoryGetter: Getter<DesignRepository>, designAdditionalLooseItemRepositoryGetter: Getter<DesignAdditionalLooseItemRepository>);
}
