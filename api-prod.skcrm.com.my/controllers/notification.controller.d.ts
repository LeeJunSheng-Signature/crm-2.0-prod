import { Notification } from '../types';
import { PushNotificationService } from './../services';
export declare class NotificationController {
    protected pushNotificationService: PushNotificationService;
    constructor(pushNotificationService: PushNotificationService);
    notifyBySegment(notification: Notification): Promise<void>;
    notifyByDevice(notification: Notification): Promise<void>;
}
