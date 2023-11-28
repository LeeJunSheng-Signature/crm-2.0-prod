import { LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
export declare class KujialeDataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
        options: {
            headers: {
                'Content-Type': string;
            };
        };
        operations: ({
            template: {
                method: string;
                url: string;
                body: {
                    name: string;
                    email: string;
                    type: string;
                    defaultPassword: string;
                    templateKey?: undefined;
                    searchType?: undefined;
                    start?: undefined;
                    num?: undefined;
                    itemInfoList?: undefined;
                    designId?: undefined;
                    levelIndex?: undefined;
                    designType?: undefined;
                    orderDesignType?: undefined;
                    notifyAddressCode?: undefined;
                    obsAuditDesignId?: undefined;
                };
            };
            functions: {
                register: string[];
                getSSOToken?: undefined;
                findCustomerOrder?: undefined;
                createInventoryDataAcquisitionTaskWithCallback?: undefined;
                createInventoryDataAcquisitionTask?: undefined;
                getInventoryDataAcquisitionTaskStatus?: undefined;
                getInventoryDataAcquisitionTaskResult?: undefined;
                getInventoryJsonData?: undefined;
            };
        } | {
            template: {
                method: string;
                url: string;
                body?: undefined;
            };
            functions: {
                getSSOToken: string[];
                register?: undefined;
                findCustomerOrder?: undefined;
                createInventoryDataAcquisitionTaskWithCallback?: undefined;
                createInventoryDataAcquisitionTask?: undefined;
                getInventoryDataAcquisitionTaskStatus?: undefined;
                getInventoryDataAcquisitionTaskResult?: undefined;
                getInventoryJsonData?: undefined;
            };
        } | {
            template: {
                method: string;
                url: string;
                body: {
                    templateKey: string;
                    searchType: number;
                    start: number;
                    num: number;
                    itemInfoList: {
                        fieldName: string;
                        value: string;
                    }[];
                    name?: undefined;
                    email?: undefined;
                    type?: undefined;
                    defaultPassword?: undefined;
                    designId?: undefined;
                    levelIndex?: undefined;
                    designType?: undefined;
                    orderDesignType?: undefined;
                    notifyAddressCode?: undefined;
                    obsAuditDesignId?: undefined;
                };
            };
            functions: {
                findCustomerOrder: string[];
                register?: undefined;
                getSSOToken?: undefined;
                createInventoryDataAcquisitionTaskWithCallback?: undefined;
                createInventoryDataAcquisitionTask?: undefined;
                getInventoryDataAcquisitionTaskStatus?: undefined;
                getInventoryDataAcquisitionTaskResult?: undefined;
                getInventoryJsonData?: undefined;
            };
        } | {
            template: {
                method: string;
                url: string;
                body: {
                    designId: string;
                    levelIndex: number;
                    designType: string;
                    orderDesignType: string;
                    notifyAddressCode: string;
                    name?: undefined;
                    email?: undefined;
                    type?: undefined;
                    defaultPassword?: undefined;
                    templateKey?: undefined;
                    searchType?: undefined;
                    start?: undefined;
                    num?: undefined;
                    itemInfoList?: undefined;
                    obsAuditDesignId?: undefined;
                };
            };
            functions: {
                createInventoryDataAcquisitionTaskWithCallback: string[];
                register?: undefined;
                getSSOToken?: undefined;
                findCustomerOrder?: undefined;
                createInventoryDataAcquisitionTask?: undefined;
                getInventoryDataAcquisitionTaskStatus?: undefined;
                getInventoryDataAcquisitionTaskResult?: undefined;
                getInventoryJsonData?: undefined;
            };
        } | {
            template: {
                method: string;
                url: string;
                body: {
                    designId: string;
                    type: string;
                    obsAuditDesignId: string;
                    orderDesignType: string;
                    name?: undefined;
                    email?: undefined;
                    defaultPassword?: undefined;
                    templateKey?: undefined;
                    searchType?: undefined;
                    start?: undefined;
                    num?: undefined;
                    itemInfoList?: undefined;
                    levelIndex?: undefined;
                    designType?: undefined;
                    notifyAddressCode?: undefined;
                };
            };
            functions: {
                createInventoryDataAcquisitionTask: string[];
                register?: undefined;
                getSSOToken?: undefined;
                findCustomerOrder?: undefined;
                createInventoryDataAcquisitionTaskWithCallback?: undefined;
                getInventoryDataAcquisitionTaskStatus?: undefined;
                getInventoryDataAcquisitionTaskResult?: undefined;
                getInventoryJsonData?: undefined;
            };
        } | {
            template: {
                method: string;
                url: string;
                body?: undefined;
            };
            functions: {
                getInventoryDataAcquisitionTaskStatus: string[];
                register?: undefined;
                getSSOToken?: undefined;
                findCustomerOrder?: undefined;
                createInventoryDataAcquisitionTaskWithCallback?: undefined;
                createInventoryDataAcquisitionTask?: undefined;
                getInventoryDataAcquisitionTaskResult?: undefined;
                getInventoryJsonData?: undefined;
            };
        } | {
            template: {
                method: string;
                url: string;
                body?: undefined;
            };
            functions: {
                getInventoryDataAcquisitionTaskResult: string[];
                register?: undefined;
                getSSOToken?: undefined;
                findCustomerOrder?: undefined;
                createInventoryDataAcquisitionTaskWithCallback?: undefined;
                createInventoryDataAcquisitionTask?: undefined;
                getInventoryDataAcquisitionTaskStatus?: undefined;
                getInventoryJsonData?: undefined;
            };
        } | {
            template: {
                method: string;
                url: string;
                body?: undefined;
            };
            functions: {
                getInventoryJsonData: string[];
                register?: undefined;
                getSSOToken?: undefined;
                findCustomerOrder?: undefined;
                createInventoryDataAcquisitionTaskWithCallback?: undefined;
                createInventoryDataAcquisitionTask?: undefined;
                getInventoryDataAcquisitionTaskStatus?: undefined;
                getInventoryDataAcquisitionTaskResult?: undefined;
            };
        })[];
        crud: boolean;
    };
    constructor(dsConfig?: object);
}
