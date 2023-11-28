import { BaseEntity } from '.';
import { Role } from './role.model';
import { Module } from './module.model';
import { Operation } from './operation.model';
import { User } from './user.model';
export declare class Permission extends BaseEntity {
    uuid?: string;
    name: string;
    roles: Role[];
    modules: Module[];
    operations: Operation[];
    users: User[];
    constructor(data?: Partial<Permission>);
}
export interface PermissionRelations {
}
export declare type PermissionWithRelations = Permission & PermissionRelations;
