import { Getter } from '@loopback/core';
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { MyUserProfile } from '../components/jwt-authentication/types';
import { Credential } from '../models';
import { CredentialRepository } from '../repositories';
import { OtpService } from '../services';
export declare class CredentialController {
    credentialRepository: CredentialRepository;
    protected otpService: OtpService;
    getCurrentUser: Getter<MyUserProfile>;
    constructor(credentialRepository: CredentialRepository, otpService: OtpService, getCurrentUser: Getter<MyUserProfile>);
    create(credential: Omit<Credential, 'uuid'>): Promise<Credential>;
    count(where?: Where<Credential>): Promise<Count>;
    find(filter?: Filter<Credential>): Promise<Credential[]>;
    updateAll(credential: Credential, where?: Where<Credential>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Credential>): Promise<Credential>;
    updateById(id: string, credential: Credential): Promise<void>;
    replaceById(id: string, credential: Credential): Promise<void>;
    deleteById(id: string): Promise<void>;
}
