import { DefaultCrudRepository, BelongsToAccessor, Getter } from '@loopback/repository';
import { DesignCreateCronJob, DesignCreateCronJobRelations, Design } from '../models';
import { MysqlDataSource } from '../datasources';
import { DesignRepository } from './design.repository';
export declare class DesignCreateCronJobRepository extends DefaultCrudRepository<DesignCreateCronJob, typeof DesignCreateCronJob.prototype.uuid, DesignCreateCronJobRelations> {
    protected designRepositoryGetter: Getter<DesignRepository>;
    readonly design: BelongsToAccessor<Design, typeof DesignCreateCronJob.prototype.uuid>;
    constructor(dataSource: MysqlDataSource, designRepositoryGetter: Getter<DesignRepository>);
}
