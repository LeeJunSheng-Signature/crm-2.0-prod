import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Operation } from '../models';
import { OperationRepository } from '../repositories';
export declare class OperationController {
    operationRepository: OperationRepository;
    constructor(operationRepository: OperationRepository);
    create(operation: Omit<Operation, 'uuid'>): Promise<Operation>;
    count(where?: Where<Operation>): Promise<Count>;
    find(filter?: Filter<Operation>): Promise<Operation[]>;
    updateAll(operation: Operation, where?: Where<Operation>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Operation>): Promise<Operation>;
    updateById(id: string, operation: Operation): Promise<void>;
    replaceById(id: string, operation: Operation): Promise<void>;
    deleteById(id: string): Promise<void>;
}
