import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Erparid, ErparidRelations } from '../models';
import { ErparidRepository } from '../repositories';
export declare class ErparidController {
    erparidRepository: ErparidRepository;
    constructor(erparidRepository: ErparidRepository);
    create(erparid: Omit<Erparid, 'id'>): Promise<Erparid>;
    count(where?: Where<Erparid>): Promise<Count>;
    find(filter?: Filter<Erparid>): Promise<Erparid[]>;
    updateAll(erparid: Erparid, where?: Where<Erparid>): Promise<Count>;
    findById(crmarid: string, filter?: FilterExcludingWhere<Erparid>): Promise<ErparidRelations | any>;
    updateById(id: number, erparid: Erparid): Promise<void>;
    replaceById(id: number, erparid: Erparid): Promise<void>;
    deleteById(id: number): Promise<void>;
}
