import { Count, Filter, Where } from '@loopback/repository';
import { User, Session } from '../models';
import { UserRepository } from '../repositories';
export declare class UserSessionController {
    protected userRepository: UserRepository;
    constructor(userRepository: UserRepository);
    find(id: string, filter?: Filter<Session>): Promise<Session[]>;
    create(id: typeof User.prototype.uuid, session: Omit<Session, 'uuid'>): Promise<Session>;
    patch(id: string, session: Partial<Session>, where?: Where<Session>): Promise<Count>;
    delete(id: string, where?: Where<Session>): Promise<Count>;
}
