import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { RejectionReason, RejectionReasonRelations } from '../models';
export declare class RejectionReasonRepository extends DefaultCrudRepository<RejectionReason, typeof RejectionReason.prototype.uuid, RejectionReasonRelations> {
    constructor(dataSource: MysqlDataSource);
}
