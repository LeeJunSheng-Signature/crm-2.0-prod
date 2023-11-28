import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { QuotationDetails } from '../models';
import { QuotationDetailsRepository } from '../repositories';
export declare class QuotationDetailController {
    quotationDetailsRepository: QuotationDetailsRepository;
    constructor(quotationDetailsRepository: QuotationDetailsRepository);
    create(quotationDetails: Omit<QuotationDetails, 'uuid'>): Promise<QuotationDetails>;
    count(where?: Where<QuotationDetails>): Promise<Count>;
    find(filter?: Filter<QuotationDetails>): Promise<QuotationDetails[]>;
    updateAll(quotationDetails: QuotationDetails, where?: Where<QuotationDetails>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<QuotationDetails>): Promise<QuotationDetails>;
    updateById(id: string, quotationDetails: QuotationDetails): Promise<void>;
    replaceById(id: string, quotationDetails: QuotationDetails): Promise<void>;
    deleteById(id: string): Promise<void>;
}
