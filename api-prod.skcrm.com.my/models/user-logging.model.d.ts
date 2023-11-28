import { BaseEntity } from '.';
export declare class UserLogging extends BaseEntity {
    uuid?: string;
    moduleName: string;
    actionType: string;
    actionDescription: string;
    userId: string;
    constructor(data?: Partial<UserLogging>);
}
export interface UserLoggingRelations {
}
export declare type UserLoggingWithRelations = UserLogging & UserLoggingRelations;
