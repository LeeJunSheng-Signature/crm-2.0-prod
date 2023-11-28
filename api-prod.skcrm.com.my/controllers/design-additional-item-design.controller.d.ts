import { DesignAdditionalItem, Design } from '../models';
import { DesignAdditionalItemRepository } from '../repositories';
export declare class DesignAdditionalItemDesignController {
    designAdditionalItemRepository: DesignAdditionalItemRepository;
    constructor(designAdditionalItemRepository: DesignAdditionalItemRepository);
    getDesign(id: typeof DesignAdditionalItem.prototype.uuid): Promise<Design>;
}
