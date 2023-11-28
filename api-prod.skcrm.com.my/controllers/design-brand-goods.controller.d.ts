import { Count, Filter, Where } from '@loopback/repository';
import { Design, BrandGoods } from '../models';
import { DesignRepository } from '../repositories';
export declare class DesignBrandGoodsController {
    protected designRepository: DesignRepository;
    constructor(designRepository: DesignRepository);
    find(id: string, filter?: Filter<BrandGoods>): Promise<BrandGoods[]>;
    create(id: typeof Design.prototype.uuid, brandGoods: Omit<BrandGoods, 'uuid'>): Promise<BrandGoods>;
    patch(id: string, brandGoods: Partial<BrandGoods>, where?: Where<BrandGoods>): Promise<Count>;
    delete(id: string, where?: Where<BrandGoods>): Promise<Count>;
}
