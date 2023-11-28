import { BaseEntity } from '.';
export declare class UserPermission extends BaseEntity {
    uuid?: string;
    userId?: string;
    permissionId?: string;
    constructor(data?: Partial<UserPermission>);
}
export interface UserPermissionRelations {
}
export declare type UserPermissionWithRelations = UserPermission & UserPermissionRelations;
