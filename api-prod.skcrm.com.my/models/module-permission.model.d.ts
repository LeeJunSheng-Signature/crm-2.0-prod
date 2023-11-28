import { BaseEntity } from '.';
export declare class ModulePermission extends BaseEntity {
    uuid?: string;
    permissionUuid?: string;
    moduleUuid?: string;
    constructor(data?: Partial<ModulePermission>);
}
export interface ModulePermissionRelations {
}
export declare type ModulePermissionWithRelations = ModulePermission & ModulePermissionRelations;
