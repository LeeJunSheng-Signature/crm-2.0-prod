import { Entity } from '@loopback/repository';
export declare class Credential extends Entity {
    uuid?: string;
    password: string;
    resetToken: string;
    tokenCreatedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    isActive: Boolean;
    userId: string;
    constructor(data?: Partial<Credential>);
}
export interface CredentialRelations {
}
export declare type CredentialWithRelations = Credential & CredentialRelations;
