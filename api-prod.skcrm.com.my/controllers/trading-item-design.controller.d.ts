import { TradingItem, Design } from '../models';
import { TradingItemRepository } from '../repositories';
export declare class TradingItemDesignController {
    tradingItemRepository: TradingItemRepository;
    constructor(tradingItemRepository: TradingItemRepository);
    getDesign(id: typeof TradingItem.prototype.uuid): Promise<Design>;
}
