import { DesignOtherItem, Design } from '../models';
import { DesignOtherItemRepository } from '../repositories';
export declare class DesignOtherItemDesignController {
    designOtherItemRepository: DesignOtherItemRepository;
    constructor(designOtherItemRepository: DesignOtherItemRepository);
    getDesign(id: typeof DesignOtherItem.prototype.uuid): Promise<Design>;
}
