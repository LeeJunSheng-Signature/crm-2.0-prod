import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Profile } from '../models';
import { ProfileRepository } from '../repositories';
export declare class ProfileController {
    profileRepository: ProfileRepository;
    constructor(profileRepository: ProfileRepository);
    create(profile: Omit<Profile, 'uuid'>): Promise<Profile>;
    count(where?: Where<Profile>): Promise<Count>;
    find(filter?: Filter<Profile>): Promise<Profile[]>;
    updateAll(profile: Profile, where?: Where<Profile>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Profile>): Promise<Profile>;
    updateById(id: string, profile: Profile): Promise<void>;
    replaceById(id: string, profile: Profile): Promise<void>;
    delete(): Promise<void>;
    deleteById(id: string): Promise<void>;
}
