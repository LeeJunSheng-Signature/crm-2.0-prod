import { Count, Filter, Where } from '@loopback/repository';
import { FinalConfirmationOrder, Design } from '../models';
import { FinalConfirmationOrderRepository } from '../repositories';
export declare class FinalConfirmationOrderDesignController {
    protected finalConfirmationOrderRepository: FinalConfirmationOrderRepository;
    constructor(finalConfirmationOrderRepository: FinalConfirmationOrderRepository);
    find(id: string, filter?: Filter<Design>): Promise<Design[]>;
    create(id: typeof FinalConfirmationOrder.prototype.uuid, design: Omit<Design, 'uuid'>): Promise<Design>;
    patch(id: string, design: Partial<Design>, where?: Where<Design>): Promise<Count>;
    delete(id: string, where?: Where<Design>): Promise<Count>;
}
