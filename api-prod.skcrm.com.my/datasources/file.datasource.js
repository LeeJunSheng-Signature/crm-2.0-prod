"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
// This is the original configuration for connecting with a remote storage bucket, currently we will be storing the files locally on the server instead
// const config = {
//   name: 'File',
//   connector: 'loopback-component-storage',
//   provider: process.env.STORAGE_PROVIDER,
//   key: process.env.STORAGE_PROVIDER_KEY,
//   keyId: process.env.STORAGE_PROVIDER_KEY_ID,
//   nameConflict: 'makeUnique',
//   makeUnique: true,
// };
// In the `backend` folder (`becore`), create a folder named `storage`, cd into this folder and then make another folder with the name `STORAGE_CONTAINER`
const config = {
    name: 'File',
    connector: 'loopback-component-storage',
    provider: 'filesystem',
    root: './storage',
    nameConflict: 'makeUnique',
    makeUnique: true,
    maxFileSize: 314572800,
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let FileDataSource = class FileDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
FileDataSource.dataSourceName = 'File';
FileDataSource.defaultConfig = config;
FileDataSource = tslib_1.__decorate([
    core_1.lifeCycleObserver('datasource'),
    tslib_1.__param(0, core_1.inject('datasources.config.File', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], FileDataSource);
exports.FileDataSource = FileDataSource;
//# sourceMappingURL=file.datasource.js.map