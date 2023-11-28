import { Count, Filter, Where } from '@loopback/repository';
import { Design, QuotationDetails } from '../models';
import { DesignRepository } from '../repositories';
export declare class DesignQuotationDetailsController {
    protected designRepository: DesignRepository;
    constructor(designRepository: DesignRepository);
    find(id: string, filter?: Filter<QuotationDetails>): Promise<QuotationDetails[]>;
    create(id: typeof Design.prototype.uuid, quotationDetails: Omit<QuotationDetails, 'uuid'>): Promise<QuotationDetails>;
    patch(id: string, quotationDetails: Partial<QuotationDetails>, where?: Where<QuotationDetails>): Promise<Count>;
    delete(id: string, where?: Where<QuotationDetails>): Promise<Count>;
}
