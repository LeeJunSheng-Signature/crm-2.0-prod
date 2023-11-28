import { DefaultCrudRepository } from '@loopback/repository';
import { ItemList, ItemListRelations } from '../models';
import { MysqlDataSource } from '../datasources';
export declare class ItemListRepository extends DefaultCrudRepository<ItemList, typeof ItemList.prototype.uuid, ItemListRelations> {
    constructor(dataSource: MysqlDataSource);
}
