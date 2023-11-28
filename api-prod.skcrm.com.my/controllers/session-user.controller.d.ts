import { Session, User } from '../models';
import { SessionRepository } from '../repositories';
export declare class SessionUserController {
    sessionRepository: SessionRepository;
    constructor(sessionRepository: SessionRepository);
    getUser(id: typeof Session.prototype.uuid): Promise<User>;
}
