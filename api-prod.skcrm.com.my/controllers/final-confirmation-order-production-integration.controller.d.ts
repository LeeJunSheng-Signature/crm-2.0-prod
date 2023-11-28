import { FilterExcludingWhere } from '@loopback/repository';
import { FinalConfirmationOrder } from '../models';
import { DesignRepository, FinalConfirmationOrderRepository, ProfileRepository } from '../repositories';
export declare class FinalConfirmationOrderProductionIntegrationController {
    designRepository: DesignRepository;
    finalConfirmationOrderRepository: FinalConfirmationOrderRepository;
    profileRepository: ProfileRepository;
    constructor(designRepository: DesignRepository, finalConfirmationOrderRepository: FinalConfirmationOrderRepository, profileRepository: ProfileRepository);
    findOrderConfirmationsNew(designId: string, filter?: FilterExcludingWhere<FinalConfirmationOrder>): Promise<{}>;
    private getOrderIncludeFilter;
    private transformOrderShape;
}
