import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { UserLogging, UserLoggingRelations, User } from '../models';
import { MysqlDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { UserRepository } from './user.repository';
export declare class UserLoggingRepository extends DefaultCrudRepository<UserLogging, typeof UserLogging.prototype.uuid, UserLoggingRelations> {
    protected userRepositoryGetter: Getter<UserRepository>;
    readonly user: BelongsToAccessor<User, typeof UserLogging.prototype.uuid>;
    constructor(dataSource: MysqlDataSource, userRepositoryGetter: Getter<UserRepository>);
}
