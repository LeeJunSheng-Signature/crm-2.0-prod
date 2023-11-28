import { Count, Filter, Where } from '@loopback/repository';
import { Profile, User } from '../models';
import { ProfileRepository, UserRepository } from '../repositories';
export declare class UserProfileController {
    protected userRepository: UserRepository;
    protected profileRepository: ProfileRepository;
    constructor(userRepository: UserRepository, profileRepository: ProfileRepository);
    get(id: string, filter?: Filter<Profile>): Promise<Profile>;
    isUserSccodeExists(code: typeof Profile.prototype.sccode): Promise<{
        exist: Boolean;
    }>;
    create(id: typeof User.prototype.uuid, profile: Omit<Profile, 'uuid'>): Promise<Profile>;
    patch(id: string, profile: Partial<Profile>, where?: Where<Profile>): Promise<Count>;
    delete(id: string, where?: Where<Profile>): Promise<Count>;
}
