import { DefaultCrudRepository } from '@loopback/repository';
import { EmailTemplate, EmailTemplateRelations } from '../models';
import { MysqlDataSource } from '../datasources';
export declare class EmailTemplateRepository extends DefaultCrudRepository<EmailTemplate, typeof EmailTemplate.prototype.uuid, EmailTemplateRelations> {
    constructor(dataSource: MysqlDataSource);
}
