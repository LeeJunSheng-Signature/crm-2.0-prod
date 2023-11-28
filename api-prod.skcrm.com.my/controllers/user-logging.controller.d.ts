import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { UserLogging } from '../models';
import { UserLoggingRepository } from '../repositories';
export declare class UserLoggingController {
    userLoggingRepository: UserLoggingRepository;
    constructor(userLoggingRepository: UserLoggingRepository);
    create(userLogging: Omit<UserLogging, 'uuid'>): Promise<UserLogging>;
    count(where?: Where<UserLogging>): Promise<Count>;
    find(filter?: Filter<UserLogging>): Promise<UserLogging[]>;
    updateAll(userLogging: UserLogging, where?: Where<UserLogging>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<UserLogging>): Promise<UserLogging>;
    updateById(id: string, userLogging: UserLogging): Promise<void>;
    replaceById(id: string, userLogging: UserLogging): Promise<void>;
    deleteById(id: string): Promise<void>;
}
