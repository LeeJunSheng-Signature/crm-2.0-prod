import { Lead, User } from '../models';
import { LeadRepository } from '../repositories';
export declare class LeadUserController {
    leadRepository: LeadRepository;
    constructor(leadRepository: LeadRepository);
    getUser(id: typeof Lead.prototype.uuid): Promise<User>;
}
