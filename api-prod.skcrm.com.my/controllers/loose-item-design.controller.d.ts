import { LooseItem, Design } from '../models';
import { LooseItemRepository } from '../repositories';
export declare class LooseItemDesignController {
    looseItemRepository: LooseItemRepository;
    constructor(looseItemRepository: LooseItemRepository);
    getDesign(id: typeof LooseItem.prototype.uuid): Promise<Design>;
}
