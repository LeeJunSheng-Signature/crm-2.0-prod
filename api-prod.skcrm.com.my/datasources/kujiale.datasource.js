"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KujialeDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config = {
    name: 'Kujiale',
    connector: 'rest',
    options: {
        headers: {
            'Content-Type': 'application/json',
        }
    },
    operations: [
        {
            template: {
                method: 'POST',
                url: `https://openapi.kujiale.com/v2/register?appkey=${process.env.KUJIALE_APPKEY}&timestamp={timestamp}&sign={sign}&appuid={uid}`,
                body: {
                    name: '{name}',
                    email: '{email}',
                    type: '0',
                    defaultPassword: '{password}'
                }
            },
            functions: {
                register: ['uid', 'name', 'email', 'password', 'timestamp', 'sign']
            }
        },
        {
            template: {
                method: 'POST',
                url: `https://openapi.kujiale.com/v2/sso/token?appkey=${process.env.KUJIALE_APPKEY}&timestamp={timestamp}&sign={sign}&appuid={uid}&dest=0`,
            },
            functions: {
                getSSOToken: ['uid', 'timestamp', 'sign']
            }
        },
        {
            template: {
                method: 'POST',
                url: `https://openapi.kujiale.com/v2/cus/order/search?appkey=${process.env.KUJIALE_APPKEY}&timestamp={timestamp}&sign={sign}&appuid={uid}`,
                body: {
                    templateKey: "cust_audit",
                    searchType: 0,
                    start: 0,
                    num: 10,
                    itemInfoList: [
                        {
                            fieldName: "orderReadableId",
                            value: '{drawingId}',
                        }
                    ]
                },
            },
            functions: {
                findCustomerOrder: ['uid', 'timestamp', 'sign', 'drawingId']
            }
        },
        {
            template: {
                method: 'POST',
                url: `https://openapi.kujiale.com/v2/task/xml?appkey=${process.env.KUJIALE_APPKEY}&timestamp={timestamp}&sign={sign}&appuid={uid}`,
                body: {
                    designId: '{designId}',
                    levelIndex: 1,
                    designType: '{designType}',
                    orderDesignType: '{orderDesignType}',
                    notifyAddressCode: '{callbackUrl}',
                },
            },
            functions: {
                createInventoryDataAcquisitionTaskWithCallback: ['uid', 'timestamp', 'sign', 'designId', 'designType', 'orderDesignType', 'callbackUrl']
            }
        },
        {
            template: {
                method: 'POST',
                url: `https://openapi.kujiale.com/v2/cus/task/listing?appkey=${process.env.KUJIALE_APPKEY}&timestamp={timestamp}&sign={sign}&appuid={uid}`,
                body: {
                    designId: '{designId}',
                    type: '{designType}',
                    obsAuditDesignId: '{obsAuditDesignId}',
                    orderDesignType: "audit",
                },
            },
            functions: {
                createInventoryDataAcquisitionTask: ['uid', 'timestamp', 'sign', 'designId', 'obsAuditDesignId', 'designType']
            }
        },
        {
            template: {
                method: 'GET',
                url: `https://openapi.kujiale.com/v2/cus/task/status?appkey=${process.env.KUJIALE_APPKEY}&timestamp={timestamp}&sign={sign}&appuid={uid}&task_id={taskId}`,
            },
            functions: {
                getInventoryDataAcquisitionTaskStatus: ['uid', 'timestamp', 'sign', 'taskId']
            }
        },
        {
            template: {
                method: 'GET',
                url: `https://openapi.kujiale.com/v2/cus/task/result?appkey=${process.env.KUJIALE_APPKEY}&timestamp={timestamp}&sign={sign}&appuid={uid}&task_id={taskId}`,
            },
            functions: {
                getInventoryDataAcquisitionTaskResult: ['uid', 'timestamp', 'sign', 'taskId']
            }
        },
        {
            template: {
                method: 'GET',
                url: `{jsonFileUrl}`,
            },
            functions: {
                getInventoryJsonData: ['jsonFileUrl']
            }
        },
    ],
    crud: false
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let KujialeDataSource = class KujialeDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
KujialeDataSource.dataSourceName = 'Kujiale';
KujialeDataSource.defaultConfig = config;
KujialeDataSource = tslib_1.__decorate([
    core_1.lifeCycleObserver('datasource'),
    tslib_1.__param(0, core_1.inject('datasources.config.Kujiale', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], KujialeDataSource);
exports.KujialeDataSource = KujialeDataSource;
//# sourceMappingURL=kujiale.datasource.js.map