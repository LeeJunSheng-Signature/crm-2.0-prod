/// <reference types="express" />
import { Filter } from '@loopback/repository';
import { Request, Response } from '@loopback/rest';
import { File } from './../models';
import { FileService } from './../services';
export declare class FileController {
    protected fileService: FileService;
    request: Request;
    response: Response;
    constructor(fileService: FileService, request: Request, response: Response);
    findFilesInContainer(filter?: Filter): Promise<File[]>;
    findFileInContainer(fileName: string): Promise<File>;
    deleteFileInContainer(fileName: string): Promise<boolean>;
    upload(): Promise<File>;
    download(fileName: string): Promise<any>;
}
