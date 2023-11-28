import { FinalConfirmationOrder, Lead } from '../models';
import { FinalConfirmationOrderRepository } from '../repositories';
export declare class FinalConfirmationOrderLeadController {
    finalConfirmationOrderRepository: FinalConfirmationOrderRepository;
    constructor(finalConfirmationOrderRepository: FinalConfirmationOrderRepository);
    getLead(id: typeof FinalConfirmationOrder.prototype.uuid): Promise<Lead>;
}
