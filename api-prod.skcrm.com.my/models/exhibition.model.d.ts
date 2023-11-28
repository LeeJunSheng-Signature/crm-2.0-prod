import { Entity } from '@loopback/repository';
import { Lead } from '../models';
export declare class Exhibition extends Entity {
    uuid?: string;
    name?: string;
    status?: string;
    warranty?: string;
    startDate?: string;
    endDate?: string;
    hideDate?: string;
    leads: Lead[];
    constructor(data?: Partial<Exhibition>);
}
export interface ExhibitionRelations {
}
export declare type ExhibitionWithRelations = Exhibition & ExhibitionRelations;
