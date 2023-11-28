import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { EmailTemplate } from '../models';
import { EmailTemplateRepository } from '../repositories';
export declare class EmailTemplateController {
    emailTemplateRepository: EmailTemplateRepository;
    constructor(emailTemplateRepository: EmailTemplateRepository);
    create(emailTemplate: Omit<EmailTemplate, 'uuid'>): Promise<EmailTemplate>;
    count(where?: Where<EmailTemplate>): Promise<Count>;
    find(filter?: Filter<EmailTemplate>): Promise<EmailTemplate[]>;
    updateAll(emailTemplate: EmailTemplate, where?: Where<EmailTemplate>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<EmailTemplate>): Promise<EmailTemplate>;
    updateById(id: string, emailTemplate: EmailTemplate): Promise<void>;
    replaceById(id: string, emailTemplate: EmailTemplate): Promise<void>;
    deleteById(id: string): Promise<void>;
}
