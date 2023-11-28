import { Entity } from '@loopback/repository';
export declare class RejectionReason extends Entity {
    uuid?: string;
    reasonCategory?: string;
    reasonTitle?: string;
    constructor(data?: Partial<RejectionReason>);
}
export interface RejectionReasonRelations {
}
export declare type RejectionReasonWithRelations = RejectionReason & RejectionReasonRelations;
