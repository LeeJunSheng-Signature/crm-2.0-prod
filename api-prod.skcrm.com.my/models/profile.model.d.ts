import { BaseEntity } from '.';
export declare class Profile extends BaseEntity {
    uuid?: string;
    sccode: string;
    userId?: string;
    constructor(data?: Partial<Profile>);
}
export interface ProfileRelations {
}
export declare type ProfileWithRelations = Profile & ProfileRelations;
