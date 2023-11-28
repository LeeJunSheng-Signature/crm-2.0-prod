import { Count, Filter, Where } from '@loopback/repository';
import { ServiceReport, ServiceOrderItem } from '../models';
import { ServiceReportRepository } from '../repositories';
export declare class ServiceReportServiceOrderItemController {
    protected serviceReportRepository: ServiceReportRepository;
    constructor(serviceReportRepository: ServiceReportRepository);
    find(id: string, filter?: Filter<ServiceOrderItem>): Promise<ServiceOrderItem[]>;
    create(id: typeof ServiceReport.prototype.uuid, serviceOrderItem: Omit<ServiceOrderItem, 'uuid'>): Promise<ServiceOrderItem>;
    patch(id: string, serviceOrderItem: Partial<ServiceOrderItem>, where?: Where<ServiceOrderItem>): Promise<Count>;
    delete(id: string, where?: Where<ServiceOrderItem>): Promise<Count>;
}
