import { Getter } from '@loopback/core';
import { Count, Filter, Where } from '@loopback/repository';
import { MyUserProfile } from '../components/jwt-authentication/types';
import { Design, Lead } from '../models';
import { BranchRepository, DesignOtherItemRepository, DesignRepository, LeadRepository } from '../repositories';
export declare class LeadDesignController {
    protected leadRepository: LeadRepository;
    protected designRepository: DesignRepository;
    protected branchRepository: BranchRepository;
    protected designOtherItemRepository: DesignOtherItemRepository;
    getCurrentUser: Getter<MyUserProfile>;
    constructor(leadRepository: LeadRepository, designRepository: DesignRepository, branchRepository: BranchRepository, designOtherItemRepository: DesignOtherItemRepository, getCurrentUser: Getter<MyUserProfile>);
    find(id: string, filter?: Filter<Design>): Promise<Design[]>;
    create(id: typeof Lead.prototype.uuid, design: Omit<Design, 'uuid'>): Promise<Design>;
    setLeadDesignsStateToSummaryQuotation(leadId: string, designIds: string[]): Promise<Design[]>;
    patch(id: string, design: Partial<Design>, where?: Where<Design>): Promise<Count>;
    delete(id: string, where?: Where<Design>): Promise<Count>;
    private generateSummaryQuotationNumberForBranch;
}
