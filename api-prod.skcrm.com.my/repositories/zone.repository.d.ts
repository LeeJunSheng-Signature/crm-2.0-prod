import { DefaultCrudRepository } from '@loopback/repository';
import { Zone, ZoneRelations } from '../models';
import { MysqlDataSource } from '../datasources';
export declare class ZoneRepository extends DefaultCrudRepository<Zone, typeof Zone.prototype.uuid, ZoneRelations> {
    constructor(dataSource: MysqlDataSource);
}
