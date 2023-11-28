import { DefaultCrudRepository } from '@loopback/repository';
import { Exhibition, ExhibitionRelations } from '../models';
import { MysqlDataSource } from '../datasources';
export declare class ExhibitionRepository extends DefaultCrudRepository<Exhibition, typeof Exhibition.prototype.uuid, ExhibitionRelations> {
    constructor(dataSource: MysqlDataSource);
}
