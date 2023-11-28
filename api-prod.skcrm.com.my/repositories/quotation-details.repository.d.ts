import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { Design, QuotationDetails, QuotationDetailsRelations } from '../models';
import { DesignRepository } from './design.repository';
export declare class QuotationDetailsRepository extends DefaultCrudRepository<QuotationDetails, typeof QuotationDetails.prototype.uuid, QuotationDetailsRelations> {
    protected designRepositoryGetter: Getter<DesignRepository>;
    readonly design: BelongsToAccessor<Design, typeof QuotationDetails.prototype.uuid>;
    constructor(dataSource: MysqlDataSource, designRepositoryGetter: Getter<DesignRepository>);
}
