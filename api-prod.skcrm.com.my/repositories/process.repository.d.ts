import { DefaultCrudRepository } from '@loopback/repository';
import { Process, ProcessRelations } from '../models';
import { MysqlDataSource } from '../datasources';
export declare class ProcessRepository extends DefaultCrudRepository<Process, typeof Process.prototype.uuid, ProcessRelations> {
    constructor(dataSource: MysqlDataSource);
}
