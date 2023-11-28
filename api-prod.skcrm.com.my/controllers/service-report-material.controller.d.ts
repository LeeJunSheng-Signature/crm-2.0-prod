import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { ServiceReportMaterial } from '../models';
import { ServiceReportMaterialRepository } from '../repositories';
export declare class ServiceReportMaterialController {
    serviceReportMaterialRepository: ServiceReportMaterialRepository;
    constructor(serviceReportMaterialRepository: ServiceReportMaterialRepository);
    create(serviceReportMaterial: Omit<ServiceReportMaterial, 'uuid'>): Promise<ServiceReportMaterial>;
    count(where?: Where<ServiceReportMaterial>): Promise<Count>;
    find(filter?: Filter<ServiceReportMaterial>): Promise<ServiceReportMaterial[]>;
    updateAll(serviceReportMaterial: ServiceReportMaterial, where?: Where<ServiceReportMaterial>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<ServiceReportMaterial>): Promise<ServiceReportMaterial>;
    updateById(id: string, serviceReportMaterial: ServiceReportMaterial): Promise<void>;
    replaceById(id: string, serviceReportMaterial: ServiceReportMaterial): Promise<void>;
    deleteById(id: string): Promise<void>;
}
