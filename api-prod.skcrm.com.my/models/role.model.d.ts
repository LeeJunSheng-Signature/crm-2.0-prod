import { BaseEntity } from './base-entity.model';
import { Permission } from './permission.model';
import { User } from './user.model';
export declare class Role extends BaseEntity {
    uuid?: string;
    name: string;
    displayName: string;
    permissions: Permission[];
    users: User[];
    constructor(data?: Partial<Role>);
}
export interface RoleRelations {
}
export declare type RoleWithRelations = Role & RoleRelations;
