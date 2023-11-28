import { BaseEntity } from '.';
export declare class Zone extends BaseEntity {
    uuid: string;
    name: string;
    constructor(data?: Partial<Zone>);
}
export interface ZoneRelations {
}
export declare type ZoneWithRelations = Zone & ZoneRelations;
