import { Entity } from '@loopback/repository';
export declare class Container extends Entity {
    name: string;
    constructor(data?: Partial<Container>);
}
export interface ContainerRelations {
}
export declare type ContainerWithRelations = Container & ContainerRelations;
