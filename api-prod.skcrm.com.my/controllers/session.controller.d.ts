import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Session } from '../models';
import { SessionRepository } from '../repositories';
export declare class SessionController {
    sessionRepository: SessionRepository;
    constructor(sessionRepository: SessionRepository);
    create(session: Omit<Session, 'uuid'>): Promise<Session>;
    count(where?: Where<Session>): Promise<Count>;
    find(filter?: Filter<Session>): Promise<Session[]>;
    updateAll(session: Session, where?: Where<Session>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Session>): Promise<Session>;
    updateById(id: string, session: Session): Promise<void>;
    replaceById(id: string, session: Session): Promise<void>;
    deleteById(id: string): Promise<void>;
}
