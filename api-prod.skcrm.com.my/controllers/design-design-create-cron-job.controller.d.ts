import { Count, Filter, Where } from '@loopback/repository';
import { Design, DesignCreateCronJob } from '../models';
import { DesignRepository, DesignCreateCronJobRepository } from '../repositories';
export declare class DesignDesignCreateCronJobController {
    protected designRepository: DesignRepository;
    protected designCreateCronJobRepository: DesignCreateCronJobRepository;
    constructor(designRepository: DesignRepository, designCreateCronJobRepository: DesignCreateCronJobRepository);
    get(id: string, filter?: Filter<DesignCreateCronJob>): Promise<DesignCreateCronJob>;
    create(id: typeof Design.prototype.uuid, designCreateCronJob: Omit<DesignCreateCronJob, 'uuid'>): Promise<DesignCreateCronJob>;
    patch(id: string, designCreateCronJob: Partial<DesignCreateCronJob>, where?: Where<DesignCreateCronJob>): Promise<Count>;
    delete(id: string, where?: Where<DesignCreateCronJob>): Promise<Count>;
}
