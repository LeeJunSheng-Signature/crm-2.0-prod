import { LifeCycleObserver } from '@loopback/core';
import { PermissionRepository } from '../repositories';
/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
export declare class PermissionSeederObserver implements LifeCycleObserver {
    permissionRepository: PermissionRepository;
    constructor(permissionRepository: PermissionRepository);
    /**
     * This method will be invoked when the application starts
     */
    start(): Promise<void>;
    /**
     * This method will be invoked when the application stops
     */
    stop(): Promise<void>;
}
