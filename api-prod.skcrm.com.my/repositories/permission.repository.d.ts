import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyThroughRepositoryFactory } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { Permission, PermissionRelations, Role, Rolepermission, Module, ModulePermission, Operation, OperationPermission, User, UserPermission } from '../models';
import { RoleRepository } from './role.repository';
import { RolepermissionRepository } from './rolepermission.repository';
import { ModulePermissionRepository } from './module-permission.repository';
import { ModuleRepository } from './module.repository';
import { OperationPermissionRepository } from './operation-permission.repository';
import { OperationRepository } from './operation.repository';
import { UserPermissionRepository } from './user-permission.repository';
import { UserRepository } from './user.repository';
export declare class PermissionRepository extends DefaultCrudRepository<Permission, typeof Permission.prototype.uuid, PermissionRelations> {
    protected rolepermissionRepositoryGetter: Getter<RolepermissionRepository>;
    protected roleRepositoryGetter: Getter<RoleRepository>;
    protected modulePermissionRepositoryGetter: Getter<ModulePermissionRepository>;
    protected moduleRepositoryGetter: Getter<ModuleRepository>;
    protected operationPermissionRepositoryGetter: Getter<OperationPermissionRepository>;
    protected operationRepositoryGetter: Getter<OperationRepository>;
    protected userPermissionRepositoryGetter: Getter<UserPermissionRepository>;
    protected userRepositoryGetter: Getter<UserRepository>;
    readonly roles: HasManyThroughRepositoryFactory<Role, typeof Role.prototype.uuid, Rolepermission, typeof Permission.prototype.uuid>;
    readonly modules: HasManyThroughRepositoryFactory<Module, typeof Module.prototype.uuid, ModulePermission, typeof Permission.prototype.uuid>;
    readonly operations: HasManyThroughRepositoryFactory<Operation, typeof Operation.prototype.uuid, OperationPermission, typeof Permission.prototype.uuid>;
    readonly users: HasManyThroughRepositoryFactory<User, typeof User.prototype.uuid, UserPermission, typeof Permission.prototype.uuid>;
    constructor(dataSource: MysqlDataSource, rolepermissionRepositoryGetter: Getter<RolepermissionRepository>, roleRepositoryGetter: Getter<RoleRepository>, modulePermissionRepositoryGetter: Getter<ModulePermissionRepository>, moduleRepositoryGetter: Getter<ModuleRepository>, operationPermissionRepositoryGetter: Getter<OperationPermissionRepository>, operationRepositoryGetter: Getter<OperationRepository>, userPermissionRepositoryGetter: Getter<UserPermissionRepository>, userRepositoryGetter: Getter<UserRepository>);
}
