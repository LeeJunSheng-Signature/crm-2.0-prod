import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Process } from '../models';
import { ProcessRepository } from '../repositories';
export declare class ProcessController {
    processRepository: ProcessRepository;
    constructor(processRepository: ProcessRepository);
    create(process: Omit<Process, 'uuid'>): Promise<Process>;
    count(where?: Where<Process>): Promise<Count>;
    find(filter?: Filter<Process>): Promise<Process[]>;
    updateAll(process: Process, where?: Where<Process>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Process>): Promise<Process>;
    updateById(id: string, process: Process): Promise<void>;
    replaceById(id: string, process: Process): Promise<void>;
    deleteById(id: string): Promise<void>;
}
