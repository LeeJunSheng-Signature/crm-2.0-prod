import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Exhibition } from '../models';
import { ExhibitionRepository } from '../repositories';
export declare class ExhibitionController {
    exhibitionRepository: ExhibitionRepository;
    constructor(exhibitionRepository: ExhibitionRepository);
    create(exhibition: Omit<Exhibition, 'uuid'>): Promise<Exhibition>;
    count(where?: Where<Exhibition>): Promise<Count>;
    find(filter?: Filter<Exhibition>): Promise<Exhibition[]>;
    updateAll(exhibition: Exhibition, where?: Where<Exhibition>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Exhibition>): Promise<Exhibition>;
    isExhibitionExist(name: typeof Exhibition.prototype.name): Promise<{
        exist: Boolean;
    }>;
    updateById(id: string, exhibition: Exhibition): Promise<void>;
    replaceById(id: string, exhibition: Exhibition): Promise<void>;
    deleteById(id: string): Promise<void>;
}
