import { OrderInfo, Design } from '../models';
import { OrderInfoRepository } from '../repositories';
export declare class OrderInfoDesignController {
    orderInfoRepository: OrderInfoRepository;
    constructor(orderInfoRepository: OrderInfoRepository);
    getDesign(id: typeof OrderInfo.prototype.uuid): Promise<Design>;
}
