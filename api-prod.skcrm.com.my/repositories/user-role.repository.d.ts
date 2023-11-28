import { DefaultCrudRepository } from '@loopback/repository';
import { UserRole, UserRoleRelations } from '../models';
import { MysqlDataSource } from '../datasources';
export declare class UserRoleRepository extends DefaultCrudRepository<UserRole, typeof UserRole.prototype.uuid, UserRoleRelations> {
    constructor(dataSource: MysqlDataSource);
}
