import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Branch } from '../models';
import { BranchRepository, RoleRepository, SettingRepository, UserRepository, LeadRepository } from '../repositories';
import { EmailService } from '../services';
export declare class BranchController {
    branchRepository: BranchRepository;
    userRepository: UserRepository;
    settingRepository: SettingRepository;
    roleRepository: RoleRepository;
    leadRepository: LeadRepository;
    protected emailService: EmailService;
    constructor(branchRepository: BranchRepository, userRepository: UserRepository, settingRepository: SettingRepository, roleRepository: RoleRepository, leadRepository: LeadRepository, emailService: EmailService);
    create(branch: Omit<Branch, 'uuid'>): Promise<Branch>;
    count(where?: Where<Branch>): Promise<Count>;
    isBranchCodeExists(branchcode: typeof Branch.prototype.code): Promise<{
        exist: Boolean;
    }>;
    isBranchFaxExists(fax: typeof Branch.prototype.faxno): Promise<{
        exist: Boolean;
    }>;
    isBranchEmailExists(email: typeof Branch.prototype.email): Promise<{
        exist: Boolean;
    }>;
    isBranchTelNoExists(telno: typeof Branch.prototype.telno): Promise<{
        exist: Boolean;
    }>;
    find(filter?: Filter<Branch>): Promise<Branch[]>;
    updateAll(branch: Branch, where?: Where<Branch>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Branch>): Promise<Branch>;
    updateById(id: string, branch: Branch): Promise<void>;
    updateRotationById(id: string, branch: Branch): Promise<void>;
    replaceById(id: string, branch: Branch): Promise<void>;
    deleteById(id: string): Promise<void>;
    GetManager(branchcode: string, data: any, filter?: FilterExcludingWhere<Branch>): Promise<any>;
    private notifyQualifiedLeadInBranchManager;
}
