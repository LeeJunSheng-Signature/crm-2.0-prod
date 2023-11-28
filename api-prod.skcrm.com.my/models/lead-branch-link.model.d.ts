import { Entity } from '@loopback/repository';
export declare class LeadBranchLink extends Entity {
    uuid?: string;
    total?: number;
    current?: number;
    date?: Date;
    campaign?: string;
    constructor(data?: Partial<LeadBranchLink>);
}
export interface LeadBranchLinkRelations {
}
export declare type LeadBranchLinkWithRelations = LeadBranchLink & LeadBranchLinkRelations;
