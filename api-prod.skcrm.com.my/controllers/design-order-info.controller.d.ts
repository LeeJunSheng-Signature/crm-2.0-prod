import { Count, Filter, Where } from '@loopback/repository';
import { Design, OrderInfo } from '../models';
import { DesignRepository } from '../repositories';
export declare class DesignOrderInfoController {
    protected designRepository: DesignRepository;
    constructor(designRepository: DesignRepository);
    get(id: string, filter?: Filter<OrderInfo>): Promise<OrderInfo>;
    create(id: typeof Design.prototype.uuid, orderInfo: Omit<OrderInfo, 'uuid'>): Promise<OrderInfo>;
    patch(id: string, orderInfo: Partial<OrderInfo>, where?: Where<OrderInfo>): Promise<Count>;
    delete(id: string, where?: Where<OrderInfo>): Promise<Count>;
}
