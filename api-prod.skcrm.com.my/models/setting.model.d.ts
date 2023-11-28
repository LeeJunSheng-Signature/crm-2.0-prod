import { Entity } from '@loopback/repository';
export declare class Setting extends Entity {
    key: string;
    value?: string;
    constructor(data?: Partial<Setting>);
}
export interface SettingRelations {
}
export declare type SettingWithRelations = Setting & SettingRelations;
