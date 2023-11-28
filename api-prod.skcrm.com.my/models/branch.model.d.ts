import { Entity } from '@loopback/repository';
import { Lead } from './lead.model';
import { User } from './user.model';
export declare class Branch extends Entity {
    uuid: string;
    name: string;
    code: string;
    type?: string;
    telno?: string;
    faxno?: string;
    email?: string;
    address1?: string;
    address2?: string;
    state?: string;
    country?: string;
    SSMNo?: string;
    GSTNo?: string;
    logo?: string;
    branchId?: string;
    priority?: number;
    leadcapacity: number;
    multiplier: number;
    createdAt?: Date;
    updatedAt?: Date;
    subBranches: Branch[];
    leads: Lead[];
    users: User[];
    constructor(data?: Partial<Branch>);
}
export interface BranchRelations {
}
export declare type BranchWithRelations = Branch & BranchRelations;
