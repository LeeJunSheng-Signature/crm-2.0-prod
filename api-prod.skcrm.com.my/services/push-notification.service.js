"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushNotificationServiceProvider = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const service_proxy_1 = require("@loopback/service-proxy");
const datasources_1 = require("../datasources");
let PushNotificationServiceProvider = class PushNotificationServiceProvider {
    constructor(dataSource = new datasources_1.OneSignalDataSource()) {
        this.dataSource = dataSource;
    }
    value() {
        return service_proxy_1.getService(this.dataSource);
    }
};
PushNotificationServiceProvider = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.OneSignal')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.OneSignalDataSource])
], PushNotificationServiceProvider);
exports.PushNotificationServiceProvider = PushNotificationServiceProvider;
//# sourceMappingURL=push-notification.service.js.map