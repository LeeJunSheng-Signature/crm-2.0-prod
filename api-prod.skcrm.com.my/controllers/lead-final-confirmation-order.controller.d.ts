import { Getter } from '@loopback/core';
import { Count, Filter, Where } from '@loopback/repository';
import { MyUserProfile } from '../components/jwt-authentication/types';
import { FinalConfirmationOrder, Lead } from '../models';
import { BranchRepository, DesignRepository, FinalConfirmationOrderRepository, LeadRepository, RoleRepository, UserRepository } from '../repositories';
import { EmailService } from '../services';
import { AdditionalLeadAttributeFCO } from '../types/additional-lead-attributes-fco.types';
export declare class LeadFinalConfirmationOrderController {
    protected leadRepository: LeadRepository;
    protected branchRepository: BranchRepository;
    protected roleRepository: RoleRepository;
    protected userRepository: UserRepository;
    protected designRepository: DesignRepository;
    protected finalConfirmationOrderRepository: FinalConfirmationOrderRepository;
    getCurrentUser: Getter<MyUserProfile>;
    protected emailService: EmailService;
    constructor(leadRepository: LeadRepository, branchRepository: BranchRepository, roleRepository: RoleRepository, userRepository: UserRepository, designRepository: DesignRepository, finalConfirmationOrderRepository: FinalConfirmationOrderRepository, getCurrentUser: Getter<MyUserProfile>, emailService: EmailService);
    deleteOldJobId(): Promise<Count>;
    createFromSummaryQuotations(designIds: string[], leadId: string): Promise<FinalConfirmationOrder>;
    changeStateToFCO(orderId: string): Promise<void>;
    produceFCO(leadId: string, orderId: string, leadFCOAttributes: AdditionalLeadAttributeFCO): Promise<void>;
    find(id: string, filter?: Filter<FinalConfirmationOrder>): Promise<FinalConfirmationOrder[]>;
    create(id: typeof Lead.prototype.uuid, finalConfirmationOrder: Omit<FinalConfirmationOrder, 'uuid'>): Promise<FinalConfirmationOrder>;
    rawToSubmitted(data: {
        paidAmountDeposit: number;
    }, leadId: string, orderId: string): Promise<void>;
    patch(id: string, finalConfirmationOrder: Partial<FinalConfirmationOrder>, where?: Where<FinalConfirmationOrder>): Promise<Count>;
    delete(id: string, where?: Where<FinalConfirmationOrder>): Promise<Count>;
    private generateOrderQuotationNumberForBranch;
    private notifyNewOrderConfirmation;
    private notifyPendingAcknowledgementOrderConfirmation;
    private notifyNewFinalConfirmationOrder;
}
