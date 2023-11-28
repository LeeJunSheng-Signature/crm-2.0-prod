import { Count, Filter, Where } from '@loopback/repository';
import { Design, DesignOtherItem } from '../models';
import { DesignRepository } from '../repositories';
export declare class DesignDesignOtherItemController {
    protected designRepository: DesignRepository;
    constructor(designRepository: DesignRepository);
    find(id: string, filter?: Filter<DesignOtherItem>): Promise<DesignOtherItem[]>;
    create(id: typeof Design.prototype.uuid, designOtherItem: Omit<DesignOtherItem, 'uuid'>): Promise<DesignOtherItem>;
    patch(id: string, designOtherItem: Partial<DesignOtherItem>, where?: Where<DesignOtherItem>): Promise<Count>;
    delete(id: string, where?: Where<DesignOtherItem>): Promise<Count>;
}
