import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { DesignCreateCronJob, FinalConfirmationOrder } from '../models';
import { BranchRepository, DesignCreateCronJobRepository, FinalConfirmationOrderRepository, RoleRepository } from '../repositories';
import { EmailService } from '../services';
export declare class FinalConfirmationOrderController {
    finalConfirmationOrderRepository: FinalConfirmationOrderRepository;
    protected roleRepository: RoleRepository;
    protected branchRepository: BranchRepository;
    protected designCreateCronJobRepository: DesignCreateCronJobRepository;
    protected emailService: EmailService;
    constructor(finalConfirmationOrderRepository: FinalConfirmationOrderRepository, roleRepository: RoleRepository, branchRepository: BranchRepository, designCreateCronJobRepository: DesignCreateCronJobRepository, emailService: EmailService);
    create(finalConfirmationOrder: Omit<FinalConfirmationOrder, 'uuid'>): Promise<FinalConfirmationOrder>;
    createCronJob(designCreateCronJob: Omit<DesignCreateCronJob, 'uuid'>): Promise<DesignCreateCronJob>;
    count(where?: Where<FinalConfirmationOrder>): Promise<Count>;
    find(filter?: Filter<FinalConfirmationOrder>): Promise<FinalConfirmationOrder[]>;
    updateAll(finalConfirmationOrder: FinalConfirmationOrder, where?: Where<FinalConfirmationOrder>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<FinalConfirmationOrder>): Promise<FinalConfirmationOrder>;
    updateById(id: string, finalConfirmationOrder: FinalConfirmationOrder): Promise<void>;
    replaceById(id: string, finalConfirmationOrder: FinalConfirmationOrder): Promise<void>;
    deleteById(id: string): Promise<void>;
    private notifyFinalConfirmationOrderToRole;
}
