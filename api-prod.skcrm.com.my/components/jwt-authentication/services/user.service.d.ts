import { UserService } from '@loopback/authentication';
import { User } from '../../../models/user.model';
import { UserRepository } from '../../../repositories/user.repository';
import { MyUserProfile } from '../types';
import { Credentials } from './../../../types/credential.types';
export declare class MyUserService implements UserService<User, Credentials> {
    userRepository: UserRepository;
    constructor(userRepository: UserRepository);
    verifyCredentials(credentials: Credentials): Promise<User>;
    convertToUserProfile(user: User): MyUserProfile;
}
