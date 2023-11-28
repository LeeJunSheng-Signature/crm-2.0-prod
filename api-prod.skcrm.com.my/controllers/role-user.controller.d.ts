import { Count, Filter, Where } from '@loopback/repository';
import { Role, User } from '../models';
import { RoleRepository } from '../repositories';
export declare class RoleUserController {
    protected roleRepository: RoleRepository;
    constructor(roleRepository: RoleRepository);
    find(id: string, filter?: Filter<User>): Promise<User[]>;
    create(id: typeof Role.prototype.uuid, user: Omit<User, 'uuid'>): Promise<User>;
    patch(id: string, user: Partial<User>, where?: Where<User>): Promise<Count>;
    delete(id: string, where?: Where<User>): Promise<Count>;
}
