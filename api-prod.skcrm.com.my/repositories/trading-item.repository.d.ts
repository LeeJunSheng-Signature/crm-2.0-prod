import { DefaultCrudRepository, BelongsToAccessor, HasManyRepositoryFactory } from '@loopback/repository';
import { TradingItem, TradingItemRelations, Design, DesignAdditionalItem } from '../models';
import { MysqlDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { DesignRepository } from './design.repository';
import { DesignAdditionalItemRepository } from './design-additional-item.repository';
export declare class TradingItemRepository extends DefaultCrudRepository<TradingItem, typeof TradingItem.prototype.uuid, TradingItemRelations> {
    protected designRepositoryGetter: Getter<DesignRepository>;
    protected designAdditionalItemRepositoryGetter: Getter<DesignAdditionalItemRepository>;
    readonly design: BelongsToAccessor<Design, typeof TradingItem.prototype.uuid>;
    readonly designAdditionalItems: HasManyRepositoryFactory<DesignAdditionalItem, typeof TradingItem.prototype.uuid>;
    constructor(dataSource: MysqlDataSource, designRepositoryGetter: Getter<DesignRepository>, designAdditionalItemRepositoryGetter: Getter<DesignAdditionalItemRepository>);
}
