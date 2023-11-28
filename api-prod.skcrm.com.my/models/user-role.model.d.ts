import { BaseEntity } from './base-entity.model';
export declare class UserRole extends BaseEntity {
    uuid?: string;
    userUuid?: string;
    roleUuid?: string;
    constructor(data?: Partial<UserRole>);
}
export interface UserRoleRelations {
}
export declare type UserRoleWithRelations = UserRole & UserRoleRelations;
