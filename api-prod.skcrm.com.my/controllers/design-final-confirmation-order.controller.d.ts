import { Design, FinalConfirmationOrder } from '../models';
import { DesignRepository } from '../repositories';
export declare class DesignFinalConfirmationOrderController {
    designRepository: DesignRepository;
    constructor(designRepository: DesignRepository);
    getFinalConfirmationOrder(id: typeof Design.prototype.uuid): Promise<FinalConfirmationOrder>;
}
