import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { DesignAdditionalLooseItem, DesignAdditionalLooseItemRelations, Design, LooseItem } from '../models';
import { MysqlDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { DesignRepository } from './design.repository';
import { LooseItemRepository } from './loose-item.repository';
export declare class DesignAdditionalLooseItemRepository extends DefaultCrudRepository<DesignAdditionalLooseItem, typeof DesignAdditionalLooseItem.prototype.uuid, DesignAdditionalLooseItemRelations> {
    protected designRepositoryGetter: Getter<DesignRepository>;
    protected looseItemRepositoryGetter: Getter<LooseItemRepository>;
    readonly design: BelongsToAccessor<Design, typeof DesignAdditionalLooseItem.prototype.uuid>;
    readonly looseItem: BelongsToAccessor<LooseItem, typeof DesignAdditionalLooseItem.prototype.uuid>;
    constructor(dataSource: MysqlDataSource, designRepositoryGetter: Getter<DesignRepository>, looseItemRepositoryGetter: Getter<LooseItemRepository>);
}
