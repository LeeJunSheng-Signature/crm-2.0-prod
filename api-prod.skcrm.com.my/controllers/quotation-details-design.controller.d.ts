import { QuotationDetails, Design } from '../models';
import { QuotationDetailsRepository } from '../repositories';
export declare class QuotationDetailsDesignController {
    quotationDetailsRepository: QuotationDetailsRepository;
    constructor(quotationDetailsRepository: QuotationDetailsRepository);
    getDesign(id: typeof QuotationDetails.prototype.uuid): Promise<Design>;
}
