"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradingItemRepository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const core_1 = require("@loopback/core");
let TradingItemRepository = class TradingItemRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, designRepositoryGetter, designAdditionalItemRepositoryGetter) {
        super(models_1.TradingItem, dataSource);
        this.designRepositoryGetter = designRepositoryGetter;
        this.designAdditionalItemRepositoryGetter = designAdditionalItemRepositoryGetter;
        this.designAdditionalItems = this.createHasManyRepositoryFactoryFor('designAdditionalItems', designAdditionalItemRepositoryGetter);
        this.registerInclusionResolver('designAdditionalItems', this.designAdditionalItems.inclusionResolver);
        this.design = this.createBelongsToAccessorFor('design', designRepositoryGetter);
        this.registerInclusionResolver('design', this.design.inclusionResolver);
    }
};
TradingItemRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mysql')), tslib_1.__param(1, repository_1.repository.getter('DesignRepository')), tslib_1.__param(2, repository_1.repository.getter('DesignAdditionalItemRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDataSource, Function, Function])
], TradingItemRepository);
exports.TradingItemRepository = TradingItemRepository;
//# sourceMappingURL=trading-item.repository.js.map