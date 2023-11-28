"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceOrderItemRepository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const core_1 = require("@loopback/core");
let ServiceOrderItemRepository = class ServiceOrderItemRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, serviceReportItemRepositoryGetter, serviceReportMaterialRepositoryGetter) {
        super(models_1.ServiceOrderItem, dataSource);
        this.serviceReportItemRepositoryGetter = serviceReportItemRepositoryGetter;
        this.serviceReportMaterialRepositoryGetter = serviceReportMaterialRepositoryGetter;
        this.material = this.createBelongsToAccessorFor('material', serviceReportMaterialRepositoryGetter);
        this.registerInclusionResolver('material', this.material.inclusionResolver);
        this.item = this.createBelongsToAccessorFor('item', serviceReportItemRepositoryGetter);
        this.registerInclusionResolver('item', this.item.inclusionResolver);
    }
};
ServiceOrderItemRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mysql')), tslib_1.__param(1, repository_1.repository.getter('ServiceReportItemRepository')), tslib_1.__param(2, repository_1.repository.getter('ServiceReportMaterialRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDataSource, Function, Function])
], ServiceOrderItemRepository);
exports.ServiceOrderItemRepository = ServiceOrderItemRepository;
//# sourceMappingURL=service-order-item.repository.js.map