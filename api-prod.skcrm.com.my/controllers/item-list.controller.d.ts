/// <reference types="express" />
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Request, Response } from '@loopback/rest';
import { ItemList } from '../models';
import { ItemListRepository } from '../repositories';
import { MulterFileService } from '../services';
export declare class ItemListController {
    itemListRepository: ItemListRepository;
    protected multerFileService: MulterFileService;
    constructor(itemListRepository: ItemListRepository, multerFileService: MulterFileService);
    create(itemList: Omit<ItemList, 'uuid'>): Promise<ItemList>;
    count(where?: Where<ItemList>): Promise<Count>;
    find(filter?: Filter<ItemList>): Promise<ItemList[]>;
    updateAll(itemList: ItemList, where?: Where<ItemList>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<ItemList>): Promise<ItemList>;
    updateById(id: string, itemList: ItemList): Promise<void>;
    replaceById(id: string, itemList: ItemList): Promise<void>;
    deleteById(id: string): Promise<void>;
    uploads(request: Request, response: Response): Promise<{
        created: number;
        updated: number;
    }>;
}
