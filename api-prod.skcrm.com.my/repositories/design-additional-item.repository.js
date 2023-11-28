"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignAdditionalItemRepository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const core_1 = require("@loopback/core");
let DesignAdditionalItemRepository = class DesignAdditionalItemRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, designRepositoryGetter, tradingItemRepositoryGetter) {
        super(models_1.DesignAdditionalItem, dataSource);
        this.designRepositoryGetter = designRepositoryGetter;
        this.tradingItemRepositoryGetter = tradingItemRepositoryGetter;
        this.tradingItem = this.createBelongsToAccessorFor('tradingItem', tradingItemRepositoryGetter);
        this.registerInclusionResolver('tradingItem', this.tradingItem.inclusionResolver);
        this.design = this.createBelongsToAccessorFor('design', designRepositoryGetter);
        this.registerInclusionResolver('design', this.design.inclusionResolver);
    }
};
DesignAdditionalItemRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mysql')), tslib_1.__param(1, repository_1.repository.getter('DesignRepository')), tslib_1.__param(2, repository_1.repository.getter('TradingItemRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDataSource, Function, Function])
], DesignAdditionalItemRepository);
exports.DesignAdditionalItemRepository = DesignAdditionalItemRepository;
//# sourceMappingURL=design-additional-item.repository.js.map