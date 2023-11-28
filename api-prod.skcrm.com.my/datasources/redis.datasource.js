"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config = {
    name: 'Redis',
    connector: 'kv-redis',
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    db: process.env.REDIS_DB
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let RedisDataSource = class RedisDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
RedisDataSource.dataSourceName = 'Redis';
RedisDataSource.defaultConfig = config;
RedisDataSource = tslib_1.__decorate([
    core_1.lifeCycleObserver('datasource'),
    tslib_1.__param(0, core_1.inject('datasources.config.Redis', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], RedisDataSource);
exports.RedisDataSource = RedisDataSource;
//# sourceMappingURL=redis.datasource.js.map