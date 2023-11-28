import { DefaultCrudRepository } from '@loopback/repository';
import { MissingItem, MissingItemRelations } from '../models';
import { MysqlDataSource } from '../datasources';
export declare class MissingItemRepository extends DefaultCrudRepository<MissingItem, typeof MissingItem.prototype.uuid, MissingItemRelations> {
    constructor(dataSource: MysqlDataSource);
}
