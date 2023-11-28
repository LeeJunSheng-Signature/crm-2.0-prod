import { DefaultCrudRepository } from '@loopback/repository';
import { Module, ModuleRelations } from '../models';
import { MysqlDataSource } from '../datasources';
export declare class ModuleRepository extends DefaultCrudRepository<Module, typeof Module.prototype.uuid, ModuleRelations> {
    constructor(dataSource: MysqlDataSource);
}
