import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { Branch, Lead, LeadRelations, User, Design, FinalConfirmationOrder, Exhibition } from '../models';
import { UserRepository } from './user.repository';
import { BranchRepository } from './branch.repository';
import { DesignRepository } from './design.repository';
import { ExhibitionRepository } from './exhibition.repository';
import { FinalConfirmationOrderRepository } from './final-confirmation-order.repository';
export declare class LeadRepository extends DefaultCrudRepository<Lead, typeof Lead.prototype.uuid, LeadRelations> {
    protected userRepositoryGetter: Getter<UserRepository>;
    protected branchRepositoryGetter: Getter<BranchRepository>;
    protected exhibitionRepositoryGetter: Getter<ExhibitionRepository>;
    protected designRepositoryGetter: Getter<DesignRepository>;
    protected finalConfirmationOrderRepositoryGetter: Getter<FinalConfirmationOrderRepository>;
    readonly branch: BelongsToAccessor<Branch, typeof Lead.prototype.uuid>;
    readonly user: BelongsToAccessor<User, typeof Lead.prototype.uuid>;
    readonly exhibition: BelongsToAccessor<Exhibition, typeof Lead.prototype.uuid>;
    readonly designs: HasManyRepositoryFactory<Design, typeof Lead.prototype.uuid>;
    readonly finalConfirmationOrders: HasManyRepositoryFactory<FinalConfirmationOrder, typeof Lead.prototype.uuid>;
    constructor(dataSource: MysqlDataSource, userRepositoryGetter: Getter<UserRepository>, branchRepositoryGetter: Getter<BranchRepository>, exhibitionRepositoryGetter: Getter<ExhibitionRepository>, designRepositoryGetter: Getter<DesignRepository>, finalConfirmationOrderRepositoryGetter: Getter<FinalConfirmationOrderRepository>);
}
