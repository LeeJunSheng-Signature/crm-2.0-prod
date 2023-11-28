import { DefaultCrudRepository } from '@loopback/repository';
import { Company, CompanyRelations } from '../models';
import { MysqlDataSource } from '../datasources';
export declare class CompanyRepository extends DefaultCrudRepository<Company, typeof Company.prototype.uuid, CompanyRelations> {
    constructor(dataSource: MysqlDataSource);
}
