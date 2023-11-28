import { LifeCycleObserver } from '@loopback/core';
import { BranchRepository } from '../repositories';
/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
export declare class BranchObserver implements LifeCycleObserver {
    branchRepository: BranchRepository;
    constructor(branchRepository: BranchRepository);
    /**
     * This method will be invoked when the application starts
     */
    start(): Promise<void>;
    /**
     * This method will be invoked when the application stops
     */
    stop(): Promise<void>;
}
