import { DefaultCrudRepository } from '@loopback/repository';
import { Profile, ProfileRelations } from '../models';
import { MysqlDataSource } from '../datasources';
export declare class ProfileRepository extends DefaultCrudRepository<Profile, typeof Profile.prototype.uuid, ProfileRelations> {
    constructor(dataSource: MysqlDataSource);
}
