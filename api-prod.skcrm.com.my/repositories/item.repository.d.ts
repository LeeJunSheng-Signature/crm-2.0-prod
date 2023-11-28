import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { Item, ItemRelations } from '../models';
export declare class ItemRepository extends DefaultCrudRepository<Item, typeof Item.prototype.uuid, ItemRelations> {
    constructor(dataSource: MysqlDataSource);
}
