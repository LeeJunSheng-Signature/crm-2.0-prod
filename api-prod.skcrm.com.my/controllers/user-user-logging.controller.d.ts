import { Count, Filter, Where } from '@loopback/repository';
import { User, UserLogging } from '../models';
import { UserRepository } from '../repositories';
export declare class UserUserLoggingController {
    protected userRepository: UserRepository;
    constructor(userRepository: UserRepository);
    find(id: string, filter?: Filter<UserLogging>): Promise<UserLogging[]>;
    create(id: typeof User.prototype.uuid, userLogging: Omit<UserLogging, 'uuid'>): Promise<UserLogging>;
    patch(id: string, userLogging: Partial<UserLogging>, where?: Where<UserLogging>): Promise<Count>;
    delete(id: string, where?: Where<UserLogging>): Promise<Count>;
}
