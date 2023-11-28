import { UserProfile } from '@loopback/security';
export interface MyUserProfile extends UserProfile {
    session: string;
    loginId: string;
    roles: Array<string>;
    permissions: Array<string>;
    mobile: string;
    user: string;
    branch: string;
    appUID: string;
    kujialeEmail: string;
}
