import { Count, Filter, Where } from '@loopback/repository';
import { Permission, User } from '../models';
import { PermissionRepository } from '../repositories';
export declare class PermissionUserController {
    protected permissionRepository: PermissionRepository;
    constructor(permissionRepository: PermissionRepository);
    find(id: string, filter?: Filter<User>): Promise<User[]>;
    create(id: typeof Permission.prototype.uuid, user: Omit<User, 'uuid'>): Promise<User>;
    patch(id: string, user: Partial<User>, where?: Where<User>): Promise<Count>;
    delete(id: string, where?: Where<User>): Promise<Count>;
}
