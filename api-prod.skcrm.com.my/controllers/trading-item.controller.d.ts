/// <reference types="express" />
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Request, Response } from '@loopback/rest';
import { TradingItem } from '../models';
import { TradingItemRepository } from '../repositories';
import { MulterFileService } from '../services';
export declare class TradingItemController {
    tradingItemRepository: TradingItemRepository;
    protected multerFileService: MulterFileService;
    constructor(tradingItemRepository: TradingItemRepository, multerFileService: MulterFileService);
    create(tradingItem: Omit<TradingItem, 'uuid'>): Promise<TradingItem>;
    count(where?: Where<TradingItem>): Promise<Count>;
    find(filter?: Filter<TradingItem>): Promise<TradingItem[]>;
    updateAll(tradingItem: TradingItem, where?: Where<TradingItem>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<TradingItem>): Promise<TradingItem>;
    updateById(id: string, tradingItem: TradingItem): Promise<void>;
    replaceById(id: string, tradingItem: TradingItem): Promise<void>;
    deleteById(id: string): Promise<void>;
    uploads(request: Request, response: Response): Promise<{
        created: number;
        updated: number;
    }>;
}
