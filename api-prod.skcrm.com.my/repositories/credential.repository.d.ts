import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { Credential, CredentialRelations } from '../models';
export declare class CredentialRepository extends DefaultCrudRepository<Credential, typeof Credential.prototype.uuid, CredentialRelations> {
    constructor(dataSource: MysqlDataSource);
}
