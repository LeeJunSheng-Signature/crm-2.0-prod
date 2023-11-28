import { DesignAdditionalLooseItem, LooseItem } from '../models';
import { DesignAdditionalLooseItemRepository } from '../repositories';
export declare class DesignAdditionalLooseItemLooseItemController {
    designAdditionalLooseItemRepository: DesignAdditionalLooseItemRepository;
    constructor(designAdditionalLooseItemRepository: DesignAdditionalLooseItemRepository);
    getLooseItem(id: typeof DesignAdditionalLooseItem.prototype.uuid): Promise<LooseItem>;
}
