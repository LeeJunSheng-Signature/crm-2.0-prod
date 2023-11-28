import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Design, DesignWithRelations } from '../models';
import { DesignAdditionalItemRepository, DesignAdditionalLooseItemRepository, DesignOtherItemRepository, DesignRepository, LooseItemRepository, TradingItemRepository } from '../repositories';
import { CalculateDetailedQuotation } from '../types/calculate-detailed-quotation.types';
export declare class DesignController {
    designRepository: DesignRepository;
    tradingItemRepository: TradingItemRepository;
    looseItemRepository: LooseItemRepository;
    designAdditionalItemRepository: DesignAdditionalItemRepository;
    designAdditionalLooseItemRepository: DesignAdditionalLooseItemRepository;
    designOtherItemRepository: DesignOtherItemRepository;
    constructor(designRepository: DesignRepository, tradingItemRepository: TradingItemRepository, looseItemRepository: LooseItemRepository, designAdditionalItemRepository: DesignAdditionalItemRepository, designAdditionalLooseItemRepository: DesignAdditionalLooseItemRepository, designOtherItemRepository: DesignOtherItemRepository);
    create(design: Omit<Design, 'uuid'>): Promise<Design>;
    calculateDetailedQuotation(data: CalculateDetailedQuotation, id: string): Promise<Design>;
    count(where?: Where<Design>): Promise<Count>;
    find(filter?: Filter<Design>): Promise<DesignWithRelations[]>;
    updateAll(design: Design, where?: Where<Design>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Design>): Promise<Design | DesignWithRelations>;
    updateById(id: string, design: Design): Promise<void>;
    replaceById(id: string, design: Design): Promise<void>;
    deleteById(id: string): Promise<void>;
}
