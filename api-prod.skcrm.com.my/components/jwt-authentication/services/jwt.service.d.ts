import { TokenService } from '@loopback/authentication';
import { User } from '../../../models';
import { MyUserProfile } from '../types';
export declare class JWTService implements TokenService {
    private jwtSecret;
    private jwtExpiresIn;
    constructor(jwtSecret: string, jwtExpiresIn: string);
    verifyToken(token: string): Promise<MyUserProfile>;
    generateToken(userProfile: MyUserProfile): Promise<string>;
    generateResetPasswordToken(user: User): Promise<string>;
    decodeResetPasswordToken(token: string): Promise<string>;
}
