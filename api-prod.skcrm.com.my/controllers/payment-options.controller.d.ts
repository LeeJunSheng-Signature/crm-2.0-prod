import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { PaymentOptions } from '../models';
import { PaymentOptionsRepository } from '../repositories';
export declare class PaymentOptionsController {
    paymentOptionsRepository: PaymentOptionsRepository;
    constructor(paymentOptionsRepository: PaymentOptionsRepository);
    create(paymentOptions: Omit<PaymentOptions, 'uuid'>): Promise<PaymentOptions>;
    count(where?: Where<PaymentOptions>): Promise<Count>;
    find(filter?: Filter<PaymentOptions>): Promise<PaymentOptions[]>;
    updateAll(paymentOptions: PaymentOptions, where?: Where<PaymentOptions>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<PaymentOptions>): Promise<PaymentOptions>;
    updateById(id: string, paymentOptions: PaymentOptions): Promise<void>;
    replaceById(id: string, paymentOptions: PaymentOptions): Promise<void>;
    deleteById(id: string): Promise<void>;
}
