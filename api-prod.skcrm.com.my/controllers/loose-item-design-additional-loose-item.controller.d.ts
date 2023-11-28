import { Count, Filter, Where } from '@loopback/repository';
import { LooseItem, DesignAdditionalLooseItem } from '../models';
import { LooseItemRepository } from '../repositories';
export declare class LooseItemDesignAdditionalLooseItemController {
    protected looseItemRepository: LooseItemRepository;
    constructor(looseItemRepository: LooseItemRepository);
    find(id: string, filter?: Filter<DesignAdditionalLooseItem>): Promise<DesignAdditionalLooseItem[]>;
    create(id: typeof LooseItem.prototype.uuid, designAdditionalLooseItem: Omit<DesignAdditionalLooseItem, 'uuid'>): Promise<DesignAdditionalLooseItem>;
    patch(id: string, designAdditionalLooseItem: Partial<DesignAdditionalLooseItem>, where?: Where<DesignAdditionalLooseItem>): Promise<Count>;
    delete(id: string, where?: Where<DesignAdditionalLooseItem>): Promise<Count>;
}
