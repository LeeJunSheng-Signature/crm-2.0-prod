import { BaseEntity } from '.';
export declare class Session extends BaseEntity {
    uuid?: string;
    deviceToken?: string;
    pushType?: string;
    userUuid: string;
    constructor(data?: Partial<Session>);
}
export interface SessionRelations {
}
export declare type SessionWithRelations = Session & SessionRelations;
