import { Entity } from '@loopback/repository';
export declare class File extends Entity {
    name: string;
    type?: string;
    url?: string;
    constructor(data?: Partial<File>);
}
export interface FileRelations {
}
export declare type FileWithRelations = File & FileRelations;
