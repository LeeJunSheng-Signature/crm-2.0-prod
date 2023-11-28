import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { ServiceReportItem } from '../models';
import { ServiceReportItemRepository } from '../repositories';
export declare class ServiceReportItemController {
    serviceReportItemRepository: ServiceReportItemRepository;
    constructor(serviceReportItemRepository: ServiceReportItemRepository);
    create(serviceReportItem: Omit<ServiceReportItem, 'uuid'>): Promise<ServiceReportItem>;
    count(where?: Where<ServiceReportItem>): Promise<Count>;
    find(filter?: Filter<ServiceReportItem>): Promise<ServiceReportItem[]>;
    updateAll(serviceReportItem: ServiceReportItem, where?: Where<ServiceReportItem>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<ServiceReportItem>): Promise<ServiceReportItem>;
    updateById(id: string, serviceReportItem: ServiceReportItem): Promise<void>;
    replaceById(id: string, serviceReportItem: ServiceReportItem): Promise<void>;
    deleteById(id: string): Promise<void>;
}
