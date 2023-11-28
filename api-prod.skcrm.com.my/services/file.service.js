"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileServiceProvider = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const service_proxy_1 = require("@loopback/service-proxy");
const datasources_1 = require("../datasources");
let FileServiceProvider = class FileServiceProvider {
    constructor(dataSource = new datasources_1.FileDataSource()) {
        this.dataSource = dataSource;
    }
    value() {
        return service_proxy_1.getService(this.dataSource);
    }
};
FileServiceProvider = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.File')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.FileDataSource])
], FileServiceProvider);
exports.FileServiceProvider = FileServiceProvider;
//# sourceMappingURL=file.service.js.map