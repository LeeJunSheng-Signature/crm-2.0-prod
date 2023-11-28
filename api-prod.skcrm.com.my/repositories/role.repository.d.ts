import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyThroughRepositoryFactory } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { Permission, Role, Rolepermission, RoleRelations, User, UserRole } from '../models';
import { PermissionRepository } from './permission.repository';
import { RolepermissionRepository } from './rolepermission.repository';
import { UserRoleRepository } from './user-role.repository';
import { UserRepository } from './user.repository';
export declare class RoleRepository extends DefaultCrudRepository<Role, typeof Role.prototype.uuid, RoleRelations> {
    protected rolepermissionRepositoryGetter: Getter<RolepermissionRepository>;
    protected permissionRepositoryGetter: Getter<PermissionRepository>;
    protected userRepositoryGetter: Getter<UserRepository>;
    protected userroleRepositoryGetter: Getter<UserRoleRepository>;
    readonly permissions: HasManyThroughRepositoryFactory<Permission, typeof Permission.prototype.uuid, Rolepermission, typeof Role.prototype.uuid>;
    readonly users: HasManyThroughRepositoryFactory<User, typeof User.prototype.uuid, UserRole, typeof Role.prototype.uuid>;
    constructor(dataSource: MysqlDataSource, rolepermissionRepositoryGetter: Getter<RolepermissionRepository>, permissionRepositoryGetter: Getter<PermissionRepository>, userRepositoryGetter: Getter<UserRepository>, userroleRepositoryGetter: Getter<UserRoleRepository>);
}
