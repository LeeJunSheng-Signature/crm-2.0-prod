import { Entity } from '@loopback/repository';
export declare class EmailTemplate extends Entity {
    uuid?: string;
    name: string;
    sender?: string;
    from?: string;
    replyTo?: string;
    subject?: string;
    body?: string;
    language?: string;
    constructor(data?: Partial<EmailTemplate>);
}
export interface EmailTemplateRelations {
}
export declare type EmailTemplateWithRelations = EmailTemplate & EmailTemplateRelations;
