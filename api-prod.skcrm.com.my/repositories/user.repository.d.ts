import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, HasOneRepositoryFactory } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { Branch, Credential, Profile, Role, Session, User, UserRelations, UserRole, Permission, UserPermission, UserLogging } from '../models';
import { BranchRepository } from './branch.repository';
import { CredentialRepository } from './credential.repository';
import { ProfileRepository } from './profile.repository';
import { RoleRepository } from './role.repository';
import { SessionRepository } from './session.repository';
import { UserRoleRepository } from './user-role.repository';
import { UserPermissionRepository } from './user-permission.repository';
import { PermissionRepository } from './permission.repository';
import { UserLoggingRepository } from './user-logging.repository';
export declare class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.uuid, UserRelations> {
    protected credentialRepositoryGetter: Getter<CredentialRepository>;
    protected userRoleRepositoryGetter: Getter<UserRoleRepository>;
    protected roleRepositoryGetter: Getter<RoleRepository>;
    protected sessionRepositoryGetter: Getter<SessionRepository>;
    protected profileRepositoryGetter: Getter<ProfileRepository>;
    protected branchRepositoryGetter: Getter<BranchRepository>;
    protected userPermissionRepositoryGetter: Getter<UserPermissionRepository>;
    protected permissionRepositoryGetter: Getter<PermissionRepository>;
    protected userLoggingRepositoryGetter: Getter<UserLoggingRepository>;
    readonly credential: HasOneRepositoryFactory<Credential, typeof User.prototype.uuid>;
    readonly roles: HasManyThroughRepositoryFactory<Role, typeof Role.prototype.uuid, UserRole, typeof User.prototype.uuid>;
    readonly sessions: HasManyRepositoryFactory<Session, typeof User.prototype.uuid>;
    readonly profile: HasOneRepositoryFactory<Profile, typeof User.prototype.uuid>;
    readonly branch: BelongsToAccessor<Branch, typeof User.prototype.uuid>;
    readonly permissions: HasManyThroughRepositoryFactory<Permission, typeof Permission.prototype.uuid, UserPermission, typeof User.prototype.uuid>;
    readonly userLoggings: HasManyRepositoryFactory<UserLogging, typeof User.prototype.uuid>;
    constructor(dataSource: MysqlDataSource, credentialRepositoryGetter: Getter<CredentialRepository>, userRoleRepositoryGetter: Getter<UserRoleRepository>, roleRepositoryGetter: Getter<RoleRepository>, sessionRepositoryGetter: Getter<SessionRepository>, profileRepositoryGetter: Getter<ProfileRepository>, branchRepositoryGetter: Getter<BranchRepository>, userPermissionRepositoryGetter: Getter<UserPermissionRepository>, permissionRepositoryGetter: Getter<PermissionRepository>, userLoggingRepositoryGetter: Getter<UserLoggingRepository>);
    findCredentials(userId: typeof User.prototype.uuid): Promise<Credential | undefined>;
}
