import { Filter } from '@loopback/repository';
import { CalculationLog } from '../models';
import { CalculationLogRepository } from '../repositories';
export declare class CalculationLogController {
    calculationLogRepository: CalculationLogRepository;
    constructor(calculationLogRepository: CalculationLogRepository);
    find(filter?: Filter<CalculationLog>): Promise<CalculationLog[]>;
}
