import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Email } from '../models';
import { EmailRepository } from '../repositories';
export declare class EmailController {
    emailRepository: EmailRepository;
    constructor(emailRepository: EmailRepository);
    create(email: Omit<Email, 'uuid'>): Promise<Email>;
    count(where?: Where<Email>): Promise<Count>;
    find(filter?: Filter<Email>): Promise<Email[]>;
    updateAll(email: Email, where?: Where<Email>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Email>): Promise<Email>;
    updateById(id: string, email: Email): Promise<void>;
    replaceById(id: string, email: Email): Promise<void>;
    deleteById(id: string): Promise<void>;
}
