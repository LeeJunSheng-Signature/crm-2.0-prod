/// <reference types="express" />
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Request, Response } from '@loopback/rest';
import { LooseItem } from '../models';
import { LooseItemRepository } from '../repositories';
import { MulterFileService } from '../services';
export declare class LooseItemController {
    looseItemRepository: LooseItemRepository;
    protected multerFileService: MulterFileService;
    constructor(looseItemRepository: LooseItemRepository, multerFileService: MulterFileService);
    create(looseItem: Omit<LooseItem, 'uuid'>): Promise<LooseItem>;
    count(where?: Where<LooseItem>): Promise<Count>;
    find(filter?: Filter<LooseItem>): Promise<LooseItem[]>;
    updateAll(looseItem: LooseItem, where?: Where<LooseItem>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<LooseItem>): Promise<LooseItem>;
    updateById(id: string, looseItem: LooseItem): Promise<void>;
    replaceById(id: string, looseItem: LooseItem): Promise<void>;
    deleteById(id: string): Promise<void>;
    uploads(request: Request, response: Response): Promise<{
        created: number;
        updated: number;
    }>;
}
