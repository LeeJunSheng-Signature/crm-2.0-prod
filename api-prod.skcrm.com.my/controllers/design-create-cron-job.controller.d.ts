import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { DesignCreateCronJob } from '../models';
import { DesignCreateCronJobRepository } from '../repositories';
export declare class DesignCreateCronJobController {
    designCreateCronJobRepository: DesignCreateCronJobRepository;
    constructor(designCreateCronJobRepository: DesignCreateCronJobRepository);
    create(designCreateCronJob: Omit<DesignCreateCronJob, 'uuid'>): Promise<DesignCreateCronJob>;
    count(where?: Where<DesignCreateCronJob>): Promise<Count>;
    find(filter?: Filter<DesignCreateCronJob>): Promise<DesignCreateCronJob[]>;
    updateAll(designCreateCronJob: DesignCreateCronJob, where?: Where<DesignCreateCronJob>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<DesignCreateCronJob>): Promise<DesignCreateCronJob>;
    updateById(id: string, designCreateCronJob: DesignCreateCronJob): Promise<void>;
    replaceById(id: string, designCreateCronJob: DesignCreateCronJob): Promise<void>;
    deleteById(id: string): Promise<void>;
}
