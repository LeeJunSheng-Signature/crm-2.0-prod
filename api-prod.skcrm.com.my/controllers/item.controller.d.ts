import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Item } from '../models';
import { ItemRepository } from '../repositories';
export declare class ItemController {
    itemRepository: ItemRepository;
    constructor(itemRepository: ItemRepository);
    create(item: Omit<Item, 'uuid'>): Promise<Item>;
    count(where?: Where<Item>): Promise<Count>;
    find(filter?: Filter<Item>): Promise<Item[]>;
    updateAll(item: Item, where?: Where<Item>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Item>): Promise<Item>;
    updateById(id: string, item: Item): Promise<void>;
    replaceById(id: string, item: Item): Promise<void>;
    deleteById(id: string): Promise<void>;
}
