import { LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
export declare class SmsTacDataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
        options: {
            headers: {
                accept: string;
                'content-type': string;
            };
        };
        operations: {
            template: {
                method: string;
                url: string | undefined;
                query: {
                    email: string;
                    key: string | undefined;
                    recipient: string;
                    message: string;
                    referenceID: string;
                };
            };
            functions: {
                sendSms: string[];
            };
        }[];
        crud: boolean;
    };
    constructor(dsConfig?: object);
}
