import { Getter } from '@loopback/core';
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { MyUserProfile } from '../components/jwt-authentication/types';
import { ServiceOrderItem, ServiceOrderItemCustom, ServiceReport } from '../models';
import { LeadRepository, RoleRepository, ServiceReportItemRepository, ServiceReportMaterialRepository, ServiceReportRepository, UserRepository } from '../repositories';
import { EmailService } from '../services';
export declare class ServiceReportController {
    serviceReportRepository: ServiceReportRepository;
    leadRepository: LeadRepository;
    userRepository: UserRepository;
    roleRepository: RoleRepository;
    serviceReportItemRepository: ServiceReportItemRepository;
    serviceReportMaterialRepository: ServiceReportMaterialRepository;
    getCurrentUser: Getter<MyUserProfile>;
    protected emailService: EmailService;
    constructor(serviceReportRepository: ServiceReportRepository, leadRepository: LeadRepository, userRepository: UserRepository, roleRepository: RoleRepository, serviceReportItemRepository: ServiceReportItemRepository, serviceReportMaterialRepository: ServiceReportMaterialRepository, getCurrentUser: Getter<MyUserProfile>, emailService: EmailService);
    create(serviceReport: Omit<ServiceReport, 'uuid'>): Promise<ServiceReport>;
    calculate(id: string, itemsData: {
        items: Omit<ServiceOrderItem, 'uuid'>[];
        customItems: Omit<ServiceOrderItemCustom, 'uuid'>[];
    }): Promise<ServiceReport>;
    count(where?: Where<ServiceReport>): Promise<Count>;
    find(filter?: Filter<ServiceReport>): Promise<ServiceReport[]>;
    updateAll(serviceReport: ServiceReport, where?: Where<ServiceReport>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<ServiceReport>): Promise<ServiceReport>;
    updateById(id: string, serviceReport: ServiceReport): Promise<void>;
    replaceById(id: string, serviceReport: ServiceReport): Promise<void>;
    deleteById(id: string): Promise<void>;
    private notifyServiceOrMaintenanceReportToRole;
    private notifyNewServiceOrMaintenanceReport;
}
