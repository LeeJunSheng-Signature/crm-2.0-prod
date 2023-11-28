import { DefaultCrudRepository } from '@loopback/repository';
import { OperationPermission, OperationPermissionRelations } from '../models';
import { MysqlDataSource } from '../datasources';
export declare class OperationPermissionRepository extends DefaultCrudRepository<OperationPermission, typeof OperationPermission.prototype.uuid, OperationPermissionRelations> {
    constructor(dataSource: MysqlDataSource);
}
