import { DefaultCrudRepository } from '@loopback/repository';
import { Erparid, ErparidRelations } from '../models';
import { MysqlDataSource } from '../datasources';
export declare class ErparidRepository extends DefaultCrudRepository<Erparid, typeof Erparid.prototype.id, ErparidRelations> {
    constructor(dataSource: MysqlDataSource);
}
