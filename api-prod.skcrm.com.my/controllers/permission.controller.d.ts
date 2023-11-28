import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Permission } from '../models';
import { PermissionRepository, RoleRepository } from '../repositories';
export declare class PermissionController {
    permissionRepository: PermissionRepository;
    roleRepository: RoleRepository;
    constructor(permissionRepository: PermissionRepository, roleRepository: RoleRepository);
    create(permission: Omit<Permission, 'uuid'>): Promise<Permission>;
    count(where?: Where<Permission>): Promise<Count>;
    find(filter?: Filter<Permission>): Promise<Permission[]>;
    updateAll(permission: Permission, where?: Where<Permission>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Permission>): Promise<Permission>;
    updateById(id: string, permission: Permission): Promise<void>;
    replaceById(id: string, permission: Permission): Promise<void>;
    deleteById(id: string): Promise<void>;
    assignPermissionToRole(id: typeof Permission.prototype.uuid, roleObj: {
        role: string;
    }): Promise<Permission>;
    unassignPermissionToRole(id: typeof Permission.prototype.uuid, roleObj: {
        role: string;
    }): Promise<Permission>;
    assignModuleToPermission(id: typeof Permission.prototype.uuid, module: {
        moduleId: string;
    }): Promise<Permission>;
    unassignModuleToPermission(id: typeof Permission.prototype.uuid, module: {
        moduleId: string;
    }): Promise<Permission>;
    assignOperationToPermission(id: typeof Permission.prototype.uuid, operation: {
        operationId: string;
    }): Promise<Permission>;
    unassignOperationToPermission(id: typeof Permission.prototype.uuid, operation: {
        operationId: string;
    }): Promise<Permission>;
    assignPermissionToUser(id: typeof Permission.prototype.uuid, userObj: {
        userUuid: string;
    }): Promise<Permission>;
    unassignPermissionToUser(id: typeof Permission.prototype.uuid, userObj: {
        userUuid: string;
    }): Promise<Permission>;
}
