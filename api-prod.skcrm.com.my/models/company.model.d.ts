import { BaseEntity } from '.';
export declare class Company extends BaseEntity {
    uuid: string;
    name: string;
    constructor(data?: Partial<Company>);
}
export interface CompanyRelations {
}
export declare type CompanyWithRelations = Company & CompanyRelations;
