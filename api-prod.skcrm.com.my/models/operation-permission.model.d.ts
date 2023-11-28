import { BaseEntity } from '.';
export declare class OperationPermission extends BaseEntity {
    uuid?: string;
    permissionUuid?: string;
    operationUuid?: string;
    constructor(data?: Partial<OperationPermission>);
}
export interface OperationPermissionRelations {
}
export declare type OperationPermissionWithRelations = OperationPermission & OperationPermissionRelations;
