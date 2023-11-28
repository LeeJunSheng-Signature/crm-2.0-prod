import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { RejectionReason } from '../models';
import { RejectionReasonRepository } from '../repositories';
export declare class RejectionReasonController {
    rejectionReasonRepository: RejectionReasonRepository;
    constructor(rejectionReasonRepository: RejectionReasonRepository);
    create(rejectionReason: Omit<RejectionReason, 'uuid'>): Promise<RejectionReason>;
    count(where?: Where<RejectionReason>): Promise<Count>;
    find(filter?: Filter<RejectionReason>): Promise<RejectionReason[]>;
    updateAll(rejectionReason: RejectionReason, where?: Where<RejectionReason>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<RejectionReason>): Promise<RejectionReason>;
    updateById(id: string, rejectionReason: RejectionReason): Promise<void>;
    replaceById(id: string, rejectionReason: RejectionReason): Promise<void>;
    deleteById(id: string): Promise<void>;
}
