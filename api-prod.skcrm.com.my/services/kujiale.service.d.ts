import { Provider } from '@loopback/core';
import { KujialeDataSource } from '../datasources';
import { CreateTaskWithCallbackResponse, FindCustomerOrderResponse, QuotationDetailsJson } from '../types/kujiale.types';
export interface Kujiale {
    register(uid: string, name: string, email: string, password: string, timestamp: number, sign: string): Promise<{
        c: string;
        m: string;
    }>;
    getSSOToken(uid: string, timestamp: number, sign: string): Promise<{
        c: string;
        m: string;
        d: string;
    }>;
    findCustomerOrder(uid: string, timestamp: number, sign: string, drawingId: string): Promise<FindCustomerOrderResponse>;
    createInventoryDataAcquisitionTaskWithCallback(uid: string, timestamp: number, sign: string, designId: string, designType: string, orderDesignType: string, callbackUrl: string): Promise<CreateTaskWithCallbackResponse>;
    createInventoryDataAcquisitionTask(uid: string, timestamp: number, sign: string, designId: string, obsAuditDesignId: string, designType: string): Promise<{
        c: string;
        m: string;
        d: string;
    }>;
    getInventoryDataAcquisitionTaskStatus(uid: string, timestamp: number, sign: string, taskId: string): Promise<{
        c: string;
        m: string;
        d: number;
    }>;
    getInventoryDataAcquisitionTaskResult(uid: string, timestamp: number, sign: string, taskId: string): Promise<{
        c: string;
        m: string;
        d: string;
    }>;
    getInventoryJsonData(url: string): Promise<QuotationDetailsJson>;
}
export declare class KujialeProvider implements Provider<Kujiale> {
    protected dataSource: KujialeDataSource;
    constructor(dataSource?: KujialeDataSource);
    value(): Promise<Kujiale>;
}
