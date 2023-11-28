import { DefaultCrudRepository } from '@loopback/repository';
import { ModulePermission, ModulePermissionRelations } from '../models';
import { MysqlDataSource } from '../datasources';
export declare class ModulePermissionRepository extends DefaultCrudRepository<ModulePermission, typeof ModulePermission.prototype.uuid, ModulePermissionRelations> {
    constructor(dataSource: MysqlDataSource);
}
