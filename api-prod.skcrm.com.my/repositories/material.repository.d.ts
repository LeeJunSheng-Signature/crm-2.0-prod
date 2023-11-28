import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { Material, MaterialRelations } from '../models';
export declare class MaterialRepository extends DefaultCrudRepository<Material, typeof Material.prototype.uuid, MaterialRelations> {
    constructor(dataSource: MysqlDataSource);
}
