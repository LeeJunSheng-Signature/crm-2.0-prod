import { Entity } from '@loopback/repository';
export declare class Erparid extends Entity {
    id?: number;
    crmarid: string;
    erparid: number;
    createdAt?: Date;
    constructor(data?: Partial<Erparid>);
}
export interface ErparidRelations {
}
export declare type ErparidWithRelations = Erparid & ErparidRelations;
