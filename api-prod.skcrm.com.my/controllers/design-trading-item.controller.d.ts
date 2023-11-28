import { Count, Filter, Where } from '@loopback/repository';
import { Design, TradingItem } from '../models';
import { DesignRepository } from '../repositories';
export declare class DesignTradingItemController {
    protected designRepository: DesignRepository;
    constructor(designRepository: DesignRepository);
    find(id: string, filter?: Filter<TradingItem>): Promise<TradingItem[]>;
    create(id: typeof Design.prototype.uuid, tradingItem: Omit<TradingItem, 'uuid'>): Promise<TradingItem>;
    patch(id: string, tradingItem: Partial<TradingItem>, where?: Where<TradingItem>): Promise<Count>;
    delete(id: string, where?: Where<TradingItem>): Promise<Count>;
}
