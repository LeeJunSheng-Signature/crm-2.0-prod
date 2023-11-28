import { BrandGoods, Design } from '../models';
import { BrandGoodsRepository } from '../repositories';
export declare class BrandGoodsDesignController {
    brandGoodsRepository: BrandGoodsRepository;
    constructor(brandGoodsRepository: BrandGoodsRepository);
    getDesign(id: typeof BrandGoods.prototype.uuid): Promise<Design>;
}
