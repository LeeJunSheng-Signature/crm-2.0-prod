import { Count, Filter, Where } from '@loopback/repository';
import { Permission, User } from '../models';
import { PermissionRepository, RoleRepository, UserRepository } from '../repositories';
import { UserPermissionAttach } from '../types';
export declare class UserPermissionController {
    protected userRepository: UserRepository;
    protected permissionRepository: PermissionRepository;
    protected roleRepository: RoleRepository;
    constructor(userRepository: UserRepository, permissionRepository: PermissionRepository, roleRepository: RoleRepository);
    find(id: string, filter?: Filter<Permission>): Promise<Permission[]>;
    attach(id: typeof User.prototype.uuid, permission: UserPermissionAttach): Promise<void>;
    create(id: typeof User.prototype.uuid, permission: Omit<Permission, 'uuid'>): Promise<Permission>;
    patch(id: string, permission: Partial<Permission>, where?: Where<Permission>): Promise<Count>;
    delete(id: string, where?: Where<Permission>): Promise<Count>;
}
