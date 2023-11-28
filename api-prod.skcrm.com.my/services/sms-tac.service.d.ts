import { Provider } from '@loopback/core';
import { SmsTacDataSource } from '../datasources';
export interface SmsTac {
    sendSms(mobile: string, message: string, rid: string): Promise<string>;
}
export declare class SmsTacProvider implements Provider<SmsTac> {
    protected dataSource: SmsTacDataSource;
    constructor(dataSource?: SmsTacDataSource);
    value(): Promise<SmsTac>;
}
