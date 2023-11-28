import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { Session, SessionRelations, User } from '../models';
import { MysqlDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { UserRepository } from './user.repository';
export declare class SessionRepository extends DefaultCrudRepository<Session, typeof Session.prototype.uuid, SessionRelations> {
    protected userRepositoryGetter: Getter<UserRepository>;
    readonly user: BelongsToAccessor<User, typeof Session.prototype.uuid>;
    constructor(dataSource: MysqlDataSource, userRepositoryGetter: Getter<UserRepository>);
}
