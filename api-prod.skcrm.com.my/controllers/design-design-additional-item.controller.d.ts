import { Count, Filter, Where } from '@loopback/repository';
import { Design, DesignAdditionalItem } from '../models';
import { DesignRepository } from '../repositories';
export declare class DesignDesignAdditionalItemController {
    protected designRepository: DesignRepository;
    constructor(designRepository: DesignRepository);
    find(id: string, filter?: Filter<DesignAdditionalItem>): Promise<DesignAdditionalItem[]>;
    create(id: typeof Design.prototype.uuid, designAdditionalItem: Omit<DesignAdditionalItem, 'uuid'>): Promise<DesignAdditionalItem>;
    patch(id: string, designAdditionalItem: Partial<DesignAdditionalItem>, where?: Where<DesignAdditionalItem>): Promise<Count>;
    delete(id: string, where?: Where<DesignAdditionalItem>): Promise<Count>;
}
