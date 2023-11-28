import { ServiceReport, User } from '../models';
import { ServiceReportRepository } from '../repositories';
export declare class ServiceReportUserController {
    serviceReportRepository: ServiceReportRepository;
    constructor(serviceReportRepository: ServiceReportRepository);
    getUser(id: typeof ServiceReport.prototype.uuid): Promise<User>;
}
