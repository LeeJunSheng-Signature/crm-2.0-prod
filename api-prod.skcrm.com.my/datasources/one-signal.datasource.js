"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneSignalDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config = {
    name: 'OneSignal',
    connector: 'rest',
    options: {
        headers: {
            Authorization: `Basic ${process.env.ONESIGNAL_APPKEY}`,
            'Content-Type': 'application/json',
        },
    },
    operations: [
        {
            template: {
                method: 'POST',
                url: 'https://onesignal.com/api/v1/notifications',
                body: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    app_id: process.env.ONESIGNAL_APPID,
                    contents: {
                        en: '{message}',
                    },
                    headings: {
                        en: '{title}',
                    },
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    included_segments: '{segment}',
                },
            },
            functions: {
                notifyBySegment: ['segment', 'title', 'message'],
            },
        },
        {
            template: {
                method: 'POST',
                url: 'https://onesignal.com/api/v1/notifications',
                body: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    app_id: process.env.ONESIGNAL_APPID,
                    contents: {
                        en: '{message}',
                    },
                    headings: {
                        en: '{title}',
                    },
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    include_external_user_ids: '{externalIds}',
                },
            },
            functions: {
                notifyByDevice: ['externalIds', 'title', 'message'],
            },
        },
    ],
    crud: false,
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let OneSignalDataSource = class OneSignalDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
OneSignalDataSource.dataSourceName = 'OneSignal';
OneSignalDataSource.defaultConfig = config;
OneSignalDataSource = tslib_1.__decorate([
    core_1.lifeCycleObserver('datasource'),
    tslib_1.__param(0, core_1.inject('datasources.config.OneSignal', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], OneSignalDataSource);
exports.OneSignalDataSource = OneSignalDataSource;
//# sourceMappingURL=one-signal.datasource.js.map