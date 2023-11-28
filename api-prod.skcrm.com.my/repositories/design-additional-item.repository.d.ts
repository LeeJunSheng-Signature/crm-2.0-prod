import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { DesignAdditionalItem, DesignAdditionalItemRelations, Design, TradingItem } from '../models';
import { MysqlDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { DesignRepository } from './design.repository';
import { TradingItemRepository } from './trading-item.repository';
export declare class DesignAdditionalItemRepository extends DefaultCrudRepository<DesignAdditionalItem, typeof DesignAdditionalItem.prototype.uuid, DesignAdditionalItemRelations> {
    protected designRepositoryGetter: Getter<DesignRepository>;
    protected tradingItemRepositoryGetter: Getter<TradingItemRepository>;
    readonly design: BelongsToAccessor<Design, typeof DesignAdditionalItem.prototype.uuid>;
    readonly tradingItem: BelongsToAccessor<TradingItem, typeof DesignAdditionalItem.prototype.uuid>;
    constructor(dataSource: MysqlDataSource, designRepositoryGetter: Getter<DesignRepository>, tradingItemRepositoryGetter: Getter<TradingItemRepository>);
}
