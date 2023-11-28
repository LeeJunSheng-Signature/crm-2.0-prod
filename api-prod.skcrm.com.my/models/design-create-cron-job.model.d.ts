import { BaseEntity } from '.';
export declare class DesignCreateCronJob extends BaseEntity {
    uuid?: string;
    createType: string;
    orderId?: string;
    createDone?: string;
    createDoneDate?: Date;
    designId: string;
    constructor(data?: Partial<DesignCreateCronJob>);
}
export interface DesignCreateCronJobRelations {
}
export declare type DesignCreateCronJobWithRelations = DesignCreateCronJob & DesignCreateCronJobRelations;
