"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsTacDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config = {
    name: 'SmsTac',
    connector: 'rest',
    options: {
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        },
    },
    operations: [
        {
            template: {
                method: 'GET',
                url: process.env.SMS_URL,
                query: {
                    email: '',
                    key: process.env.SMS_API,
                    recipient: '{mobile}',
                    message: process.env.SMS_TAG + ' {message}',
                    referenceID: '{rid}',
                },
            },
            functions: {
                sendSms: ['mobile', 'message', 'rid'],
            },
        },
    ],
    crud: false,
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let SmsTacDataSource = class SmsTacDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
SmsTacDataSource.dataSourceName = 'SmsTac';
SmsTacDataSource.defaultConfig = config;
SmsTacDataSource = tslib_1.__decorate([
    core_1.lifeCycleObserver('datasource'),
    tslib_1.__param(0, core_1.inject('datasources.config.SmsTac', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], SmsTacDataSource);
exports.SmsTacDataSource = SmsTacDataSource;
//# sourceMappingURL=sms-tac.datasource.js.map