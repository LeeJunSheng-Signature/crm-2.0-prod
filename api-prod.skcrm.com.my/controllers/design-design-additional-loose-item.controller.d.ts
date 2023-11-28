import { Count, Filter, Where } from '@loopback/repository';
import { Design, DesignAdditionalLooseItem } from '../models';
import { DesignRepository } from '../repositories';
export declare class DesignDesignAdditionalLooseItemController {
    protected designRepository: DesignRepository;
    constructor(designRepository: DesignRepository);
    find(id: string, filter?: Filter<DesignAdditionalLooseItem>): Promise<DesignAdditionalLooseItem[]>;
    create(id: typeof Design.prototype.uuid, designAdditionalLooseItem: Omit<DesignAdditionalLooseItem, 'uuid'>): Promise<DesignAdditionalLooseItem>;
    patch(id: string, designAdditionalLooseItem: Partial<DesignAdditionalLooseItem>, where?: Where<DesignAdditionalLooseItem>): Promise<Count>;
    delete(id: string, where?: Where<DesignAdditionalLooseItem>): Promise<Count>;
}
