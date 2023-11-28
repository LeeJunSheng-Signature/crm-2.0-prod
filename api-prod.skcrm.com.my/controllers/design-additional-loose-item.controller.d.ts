import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { DesignAdditionalLooseItem } from '../models';
import { DesignAdditionalLooseItemRepository } from '../repositories';
export declare class DesignAdditionalLooseItemController {
    designAdditionalLooseItemRepository: DesignAdditionalLooseItemRepository;
    constructor(designAdditionalLooseItemRepository: DesignAdditionalLooseItemRepository);
    create(designAdditionalLooseItem: Omit<DesignAdditionalLooseItem, 'uuid'>): Promise<DesignAdditionalLooseItem>;
    count(where?: Where<DesignAdditionalLooseItem>): Promise<Count>;
    find(filter?: Filter<DesignAdditionalLooseItem>): Promise<DesignAdditionalLooseItem[]>;
    updateAll(designAdditionalLooseItem: DesignAdditionalLooseItem, where?: Where<DesignAdditionalLooseItem>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<DesignAdditionalLooseItem>): Promise<DesignAdditionalLooseItem>;
    updateById(id: string, designAdditionalLooseItem: DesignAdditionalLooseItem): Promise<void>;
    replaceById(id: string, designAdditionalLooseItem: DesignAdditionalLooseItem): Promise<void>;
    deleteById(id: string): Promise<void>;
}
