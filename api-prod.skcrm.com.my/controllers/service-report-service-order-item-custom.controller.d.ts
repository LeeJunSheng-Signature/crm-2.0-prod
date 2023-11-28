import { Count, Filter, Where } from '@loopback/repository';
import { ServiceReport, ServiceOrderItemCustom } from '../models';
import { ServiceReportRepository } from '../repositories';
export declare class ServiceReportServiceOrderItemCustomController {
    protected serviceReportRepository: ServiceReportRepository;
    constructor(serviceReportRepository: ServiceReportRepository);
    find(id: string, filter?: Filter<ServiceOrderItemCustom>): Promise<ServiceOrderItemCustom[]>;
    create(id: typeof ServiceReport.prototype.uuid, serviceOrderItemCustom: Omit<ServiceOrderItemCustom, 'uuid'>): Promise<ServiceOrderItemCustom>;
    patch(id: string, serviceOrderItemCustom: Partial<ServiceOrderItemCustom>, where?: Where<ServiceOrderItemCustom>): Promise<Count>;
    delete(id: string, where?: Where<ServiceOrderItemCustom>): Promise<Count>;
}
