/// <reference types="express" />
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Request, Response } from '@loopback/rest';
import { BranchController } from '.';
import { Lead } from '../models';
import { BranchRepository, DesignRepository, LeadRepository, RoleRepository, SettingRepository, UserRepository, UserRoleRepository } from '../repositories';
import { EmailService, FileService } from '../services';
export declare class LeadController {
    leadRepository: LeadRepository;
    branchRepository: BranchRepository;
    settingRepository: SettingRepository;
    roleRepository: RoleRepository;
    userRoleRepository: UserRoleRepository;
    userRepository: UserRepository;
    designRepository: DesignRepository;
    branchController: BranchController;
    protected fileService: FileService;
    protected emailService: EmailService;
    request: Request;
    response: Response;
    constructor(leadRepository: LeadRepository, branchRepository: BranchRepository, settingRepository: SettingRepository, roleRepository: RoleRepository, userRoleRepository: UserRoleRepository, userRepository: UserRepository, designRepository: DesignRepository, branchController: BranchController, fileService: FileService, emailService: EmailService, request: Request, response: Response);
    create(lead: Omit<Lead, 'uuid'>): Promise<Lead>;
    createOnlineLead(lead: Omit<Lead, 'uuid'>): Promise<Lead>;
    findById(id: string, filter?: FilterExcludingWhere<Lead>): Promise<Lead>;
    count(where?: Where<Lead>): Promise<Count>;
    find(filter?: Filter<Lead>): Promise<any>;
    disqualifyLeadsAfterOneMonth(): Promise<Lead[]>;
    updateAll(lead: Lead, where?: Where<Lead>): Promise<Count>;
    isLeadPhoneExists(phone: typeof Lead.prototype.phone): Promise<{
        exist: Boolean;
    }>;
    isLeadEmailExists(email: typeof Lead.prototype.email): Promise<{
        exist: Boolean;
    }>;
    getBranchSuggestion(): Promise<{
        branch: string;
    }>;
    assignToBranch(id: string, lead: Lead): Promise<void>;
    updateById(id: string, lead: Lead): Promise<void>;
    replaceById(id: string, lead: Lead): Promise<void>;
    deleteById(id: string): Promise<void>;
    delete(): Promise<void>;
    private notifyNewQualifiedLeadInBranch;
    ChangeCampaign(data: any): Promise<any>;
    private RequestCampaignChange;
}
