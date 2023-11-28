import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { DesignOtherItem, DesignOtherItemRelations, Design } from '../models';
import { DesignRepository } from './design.repository';
export declare class DesignOtherItemRepository extends DefaultCrudRepository<DesignOtherItem, typeof DesignOtherItem.prototype.uuid, DesignOtherItemRelations> {
    protected designRepositoryGetter: Getter<DesignRepository>;
    readonly design: BelongsToAccessor<Design, typeof DesignOtherItem.prototype.uuid>;
    constructor(dataSource: MysqlDataSource, designRepositoryGetter: Getter<DesignRepository>);
}
