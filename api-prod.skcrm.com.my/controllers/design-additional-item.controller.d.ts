import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { DesignAdditionalItem } from '../models';
import { DesignAdditionalItemRepository } from '../repositories';
export declare class DesignAdditionalItemController {
    designAdditionalItemRepository: DesignAdditionalItemRepository;
    constructor(designAdditionalItemRepository: DesignAdditionalItemRepository);
    create(designAdditionalItem: Omit<DesignAdditionalItem, 'uuid'>): Promise<DesignAdditionalItem>;
    count(where?: Where<DesignAdditionalItem>): Promise<Count>;
    find(filter?: Filter<DesignAdditionalItem>): Promise<DesignAdditionalItem[]>;
    updateAll(designAdditionalItem: DesignAdditionalItem, where?: Where<DesignAdditionalItem>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<DesignAdditionalItem>): Promise<DesignAdditionalItem>;
    updateById(id: string, designAdditionalItem: DesignAdditionalItem): Promise<void>;
    replaceById(id: string, designAdditionalItem: DesignAdditionalItem): Promise<void>;
    deleteById(id: string): Promise<void>;
}
