import { Count, Filter, Where } from '@loopback/repository';
import { Design, LooseItem } from '../models';
import { DesignRepository } from '../repositories';
export declare class DesignLooseItemController {
    protected designRepository: DesignRepository;
    constructor(designRepository: DesignRepository);
    find(id: string, filter?: Filter<LooseItem>): Promise<LooseItem[]>;
    create(id: typeof Design.prototype.uuid, looseItem: Omit<LooseItem, 'uuid'>): Promise<LooseItem>;
    patch(id: string, looseItem: Partial<LooseItem>, where?: Where<LooseItem>): Promise<Count>;
    delete(id: string, where?: Where<LooseItem>): Promise<Count>;
}
