import { UserLogging, User } from '../models';
import { UserLoggingRepository } from '../repositories';
export declare class UserLoggingUserController {
    userLoggingRepository: UserLoggingRepository;
    constructor(userLoggingRepository: UserLoggingRepository);
    getUser(id: typeof UserLogging.prototype.uuid): Promise<User>;
}
