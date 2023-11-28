import { DefaultCrudRepository } from '@loopback/repository';
import { UserPermission, UserPermissionRelations } from '../models';
import { MysqlDataSource } from '../datasources';
export declare class UserPermissionRepository extends DefaultCrudRepository<UserPermission, typeof UserPermission.prototype.uuid, UserPermissionRelations> {
    constructor(dataSource: MysqlDataSource);
}
