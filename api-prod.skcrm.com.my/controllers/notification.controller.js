"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const tslib_1 = require("tslib");
// Uncomment these imports to begin using these cool features!
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const schema_1 = require("../schema");
let NotificationController = class NotificationController {
    constructor(pushNotificationService) {
        this.pushNotificationService = pushNotificationService;
    }
    async notifyBySegment(notification) {
        return this.pushNotificationService.notifyBySegment(notification.segments, notification.title, notification.message);
    }
    async notifyByDevice(notification) {
        return this.pushNotificationService.notifyByDevice(notification.externalUserIds, notification.title, notification.message);
    }
};
tslib_1.__decorate([
    rest_1.post('/notify/segment', {
        responses: {
            '200': {
                description: 'Push notification tester',
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': { schema: schema_1.NotificationSchema },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NotificationController.prototype, "notifyBySegment", null);
tslib_1.__decorate([
    rest_1.post('/notify/device', {
        responses: {
            '200': {
                description: 'Push notification tester',
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': { schema: schema_1.NotificationSchema },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NotificationController.prototype, "notifyByDevice", null);
NotificationController = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('services.PushNotificationService')),
    tslib_1.__metadata("design:paramtypes", [Object])
], NotificationController);
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map