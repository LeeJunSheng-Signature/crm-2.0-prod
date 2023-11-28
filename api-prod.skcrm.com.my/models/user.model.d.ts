import { BaseEntity } from './base-entity.model';
import { Credential } from './credential.model';
import { Permission } from './permission.model';
import { Profile } from './profile.model';
import { Role } from './role.model';
import { Session } from './session.model';
import { UserLogging } from './user-logging.model';
import { Lead } from './lead.model';
export declare class User extends BaseEntity {
    uuid?: string;
    loginId: string;
    name: string;
    mobile: string;
    appUID: string;
    email: string;
    kujialeEmail: string;
    active: boolean;
    credential: Credential;
    roles: Role[];
    sessions: Session[];
    profile: Profile;
    branchId: string;
    permissions: Permission[];
    userLoggings: UserLogging[];
    leads: Lead[];
    constructor(data?: Partial<User>);
}
export interface UserRelations {
}
export declare type UserWithRelations = User & UserRelations;
