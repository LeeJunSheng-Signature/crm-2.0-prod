import { BaseEntity } from '.';
export declare class CalculationLog extends BaseEntity {
    uuid?: string;
    drawingNumber: string;
    kujialeSequenceId?: number;
    itemId: string;
    parentItemId: string;
    name: string;
    brandGoodName: string;
    brandGoodCode: string;
    material: string;
    colour: string;
    profile: string;
    width: string;
    height: string;
    depth: string;
    totalItemProcessCost: number;
    ccost: number;
    stdCost: number;
    markupRate: number;
    nonStdRate: number;
    totalCost: number;
    rrp: number;
    quantity: number;
    constructor(data?: Partial<CalculationLog>);
}
export interface CalculationLogRelations {
}
export declare type CalculationLogWithRelations = CalculationLog & CalculationLogRelations;
