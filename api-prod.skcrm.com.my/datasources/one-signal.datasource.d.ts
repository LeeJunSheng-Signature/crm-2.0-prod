import { LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
export declare class OneSignalDataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
        options: {
            headers: {
                Authorization: string;
                'Content-Type': string;
            };
        };
        operations: ({
            template: {
                method: string;
                url: string;
                body: {
                    app_id: string | undefined;
                    contents: {
                        en: string;
                    };
                    headings: {
                        en: string;
                    };
                    included_segments: string;
                    include_external_user_ids?: undefined;
                };
            };
            functions: {
                notifyBySegment: string[];
                notifyByDevice?: undefined;
            };
        } | {
            template: {
                method: string;
                url: string;
                body: {
                    app_id: string | undefined;
                    contents: {
                        en: string;
                    };
                    headings: {
                        en: string;
                    };
                    include_external_user_ids: string;
                    included_segments?: undefined;
                };
            };
            functions: {
                notifyByDevice: string[];
                notifyBySegment?: undefined;
            };
        })[];
        crud: boolean;
    };
    constructor(dsConfig?: object);
}
