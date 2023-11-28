import { Entity } from '@loopback/repository';
export declare abstract class BaseEntity extends Entity {
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    constructor(data?: Partial<BaseEntity>);
}
