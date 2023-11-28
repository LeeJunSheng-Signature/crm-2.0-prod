"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RejectionReasonRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let RejectionReasonRepository = class RejectionReasonRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.RejectionReason, dataSource);
    }
};
RejectionReasonRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mysql')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDataSource])
], RejectionReasonRepository);
exports.RejectionReasonRepository = RejectionReasonRepository;
//# sourceMappingURL=rejection-reason.repository.js.map