import { DesignAdditionalLooseItem, Design } from '../models';
import { DesignAdditionalLooseItemRepository } from '../repositories';
export declare class DesignAdditionalLooseItemDesignController {
    designAdditionalLooseItemRepository: DesignAdditionalLooseItemRepository;
    constructor(designAdditionalLooseItemRepository: DesignAdditionalLooseItemRepository);
    getDesign(id: typeof DesignAdditionalLooseItem.prototype.uuid): Promise<Design>;
}
