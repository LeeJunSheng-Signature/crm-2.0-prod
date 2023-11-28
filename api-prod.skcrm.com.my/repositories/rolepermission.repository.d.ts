import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { Rolepermission, RolepermissionRelations } from '../models';
export declare class RolepermissionRepository extends DefaultCrudRepository<Rolepermission, typeof Rolepermission.prototype.uuid, RolepermissionRelations> {
    constructor(dataSource: MysqlDataSource);
}
