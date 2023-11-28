/// <reference types="express" />
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Request, Response } from '@loopback/rest';
import { Material } from '../models';
import { MaterialRepository } from '../repositories';
import { MulterFileService } from '../services';
export declare class MaterialController {
    materialRepository: MaterialRepository;
    protected multerFileService: MulterFileService;
    constructor(materialRepository: MaterialRepository, multerFileService: MulterFileService);
    create(material: Omit<Material, 'uuid'>): Promise<Material>;
    count(where?: Where<Material>): Promise<Count>;
    find(filter?: Filter<Material>): Promise<Material[]>;
    updateAll(material: Material, where?: Where<Material>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Material>): Promise<Material>;
    updateById(id: string, material: Material): Promise<void>;
    replaceById(id: string, material: Material): Promise<void>;
    deleteById(id: string): Promise<void>;
    uploads(request: Request, response: Response): Promise<{
        created: number;
        updated: number;
    }>;
}
