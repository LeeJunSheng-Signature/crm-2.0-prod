import { Provider } from '@loopback/core';
import { OneSignalDataSource } from '../datasources';
export interface PushNotificationService {
    /**
     * Sending push notification
     * @params [string] {opts.playerIds} - List of OneSignal player_id
     * @params [string] {opts.externalUserIds} - List of user session id
     * @params string {opts.title} - Notification title. Support english (en) only
     * @params string {opts.message} - Notification message body (en). Support english (en) only
     * @returns Promise {void}
     */
    notifyBySegment(segments: [string], title: string, message: string): Promise<void>;
    notifyByDevice(externalIds: [string], title: string, message: string): Promise<void>;
}
export declare class PushNotificationServiceProvider implements Provider<PushNotificationService> {
    protected dataSource: OneSignalDataSource;
    constructor(dataSource?: OneSignalDataSource);
    value(): Promise<PushNotificationService>;
}
