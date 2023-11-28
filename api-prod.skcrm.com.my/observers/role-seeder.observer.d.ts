import { LifeCycleObserver } from '@loopback/core';
import { RoleRepository } from '../repositories';
/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
export declare class RoleSeederObserver implements LifeCycleObserver {
    roleRepository: RoleRepository;
    constructor(roleRepository: RoleRepository);
    /**
     * This method will be invoked when the application starts
     */
    start(): Promise<void>;
    /**
     * This method will be invoked when the application stops
     */
    stop(): Promise<void>;
}
