import { LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
export declare class FileDataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
        provider: string;
        root: string;
        nameConflict: string;
        makeUnique: boolean;
        maxFileSize: number;
    };
    constructor(dsConfig?: object);
}
