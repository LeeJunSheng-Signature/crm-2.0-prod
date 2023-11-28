import { LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
export declare class MysqlDataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
        url: string;
        host: string | undefined;
        port: string | number;
        user: string;
        password: string;
        database: string;
        maxDepthOfQuery: number;
    };
    constructor(dsConfig?: object);
}
