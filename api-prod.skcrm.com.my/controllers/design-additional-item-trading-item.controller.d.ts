import { DesignAdditionalItem, TradingItem } from '../models';
import { DesignAdditionalItemRepository } from '../repositories';
export declare class DesignAdditionalItemTradingItemController {
    designAdditionalItemRepository: DesignAdditionalItemRepository;
    constructor(designAdditionalItemRepository: DesignAdditionalItemRepository);
    getTradingItem(id: typeof DesignAdditionalItem.prototype.uuid): Promise<TradingItem>;
}
