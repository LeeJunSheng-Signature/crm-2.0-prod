import { User, Branch } from '../models';
import { UserRepository } from '../repositories';
export declare class UserBranchController {
    userRepository: UserRepository;
    constructor(userRepository: UserRepository);
    getBranch(id: typeof User.prototype.uuid): Promise<Branch>;
}
