import { Count, Filter, Where } from '@loopback/repository';
import { TradingItem, DesignAdditionalItem } from '../models';
import { TradingItemRepository } from '../repositories';
export declare class TradingItemDesignAdditionalItemController {
    protected tradingItemRepository: TradingItemRepository;
    constructor(tradingItemRepository: TradingItemRepository);
    find(id: string, filter?: Filter<DesignAdditionalItem>): Promise<DesignAdditionalItem[]>;
    create(id: typeof TradingItem.prototype.uuid, designAdditionalItem: Omit<DesignAdditionalItem, 'uuid'>): Promise<DesignAdditionalItem>;
    patch(id: string, designAdditionalItem: Partial<DesignAdditionalItem>, where?: Where<DesignAdditionalItem>): Promise<Count>;
    delete(id: string, where?: Where<DesignAdditionalItem>): Promise<Count>;
}
