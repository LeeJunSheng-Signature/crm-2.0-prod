import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { MissingItem } from '../models';
import { MissingItemRepository } from '../repositories';
export declare class MissingItemController {
    missingItemRepository: MissingItemRepository;
    constructor(missingItemRepository: MissingItemRepository);
    create(missingItem: Omit<MissingItem, 'uuid'>): Promise<MissingItem>;
    count(where?: Where<MissingItem>): Promise<Count>;
    find(filter?: Filter<MissingItem>): Promise<MissingItem[]>;
    updateAll(missingItem: MissingItem, where?: Where<MissingItem>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<MissingItem>): Promise<MissingItem>;
    updateById(id: string, missingItem: MissingItem): Promise<void>;
    replaceById(id: string, missingItem: MissingItem): Promise<void>;
    deleteById(id: string): Promise<void>;
}
