import { Design, Lead } from '../models';
import { DesignRepository } from '../repositories';
export declare class DesignLeadController {
    designRepository: DesignRepository;
    constructor(designRepository: DesignRepository);
    getLead(id: typeof Design.prototype.uuid): Promise<Lead>;
}
