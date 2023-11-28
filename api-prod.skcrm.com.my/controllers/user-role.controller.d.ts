import { Role, User } from '../models';
import { UserRepository } from '../repositories';
export declare class UserRoleController {
    protected userRepository: UserRepository;
    constructor(userRepository: UserRepository);
    find(id: string): Promise<Role[]>;
    create(id: typeof User.prototype.uuid, role: {
        roleId: string;
    }): Promise<User>;
    unassignRole(id: typeof User.prototype.uuid, role: {
        roleId: string;
    }): Promise<User>;
}
