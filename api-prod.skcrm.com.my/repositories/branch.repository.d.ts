import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { Branch, BranchRelations, Lead, User } from '../models';
import { LeadRepository } from './lead.repository';
import { UserRepository } from './user.repository';
export declare class BranchRepository extends DefaultCrudRepository<Branch, typeof Branch.prototype.uuid, BranchRelations> {
    protected LeadRepositoryGetter: Getter<LeadRepository>;
    protected branchRepositoryGetter: Getter<BranchRepository>;
    protected userRepositoryGetter: Getter<UserRepository>;
    readonly leads: HasManyRepositoryFactory<Lead, typeof Branch.prototype.uuid>;
    readonly subBranches: HasManyRepositoryFactory<Branch, typeof Branch.prototype.uuid>;
    readonly users: HasManyRepositoryFactory<User, typeof Branch.prototype.uuid>;
    constructor(dataSource: MysqlDataSource, LeadRepositoryGetter: Getter<LeadRepository>, branchRepositoryGetter: Getter<BranchRepository>, userRepositoryGetter: Getter<UserRepository>);
}
