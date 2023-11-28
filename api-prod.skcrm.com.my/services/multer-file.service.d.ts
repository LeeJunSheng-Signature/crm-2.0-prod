/// <reference types="express" />
import { Request, Response } from '@loopback/rest';
export declare class MulterFileService {
    constructor();
    getFiles(request: Request, response: Response): Promise<any>;
}
