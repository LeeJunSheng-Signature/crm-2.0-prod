import { Entity } from '@loopback/repository';
export declare class Email extends Entity {
    uuid?: string;
    to: string;
    cc?: string;
    bcc?: string;
    subject: string;
    content: string;
    constructor(data?: Partial<Email>);
}
export interface EmailRelations {
}
export declare type EmailWithRelations = Email & EmailRelations;
