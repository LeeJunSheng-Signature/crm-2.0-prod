import { BaseEntity } from '.';
export declare class Rolepermission extends BaseEntity {
    uuid?: string;
    roleUuid?: string;
    permissionUuid?: string;
    constructor(data?: Partial<Rolepermission>);
}
export interface RolepermissionRelations {
}
export declare type RolepermissionWithRelations = Rolepermission & RolepermissionRelations;
