import { DefaultKeyValueRepository } from '@loopback/repository';
import { Setting } from '../models';
import { RedisDataSource } from '../datasources';
export declare class SettingRepository extends DefaultKeyValueRepository<Setting> {
    constructor(dataSource: RedisDataSource);
}
