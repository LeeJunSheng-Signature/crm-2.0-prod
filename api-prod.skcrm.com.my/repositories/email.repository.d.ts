import { DefaultCrudRepository } from '@loopback/repository';
import { Email, EmailRelations } from '../models';
import { MysqlDataSource } from '../datasources';
export declare class EmailRepository extends DefaultCrudRepository<Email, typeof Email.prototype.uuid, EmailRelations> {
    constructor(dataSource: MysqlDataSource);
}
