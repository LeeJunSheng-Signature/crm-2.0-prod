import { LifeCycleObserver } from '@loopback/core';
import { SettingRepository } from '../repositories';
/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
export declare class SettingObserver implements LifeCycleObserver {
    settingRepository: SettingRepository;
    constructor(settingRepository: SettingRepository);
    /**
     * This method will be invoked when the application starts
     */
    start(): Promise<void>;
    /**
     * This method will be invoked when the application stops
     */
    stop(): Promise<void>;
}
