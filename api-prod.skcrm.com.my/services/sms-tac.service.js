"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsTacProvider = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const service_proxy_1 = require("@loopback/service-proxy");
const datasources_1 = require("../datasources");
let SmsTacProvider = class SmsTacProvider {
    constructor(
    // SmsTac must match the name property in the datasource json file
    dataSource = new datasources_1.SmsTacDataSource()) {
        this.dataSource = dataSource;
    }
    value() {
        return service_proxy_1.getService(this.dataSource);
    }
};
SmsTacProvider = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.SmsTac')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.SmsTacDataSource])
], SmsTacProvider);
exports.SmsTacProvider = SmsTacProvider;
//# sourceMappingURL=sms-tac.service.js.map