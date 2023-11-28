"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LooseItemRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let LooseItemRepository = class LooseItemRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, designRepositoryGetter, designAdditionalLooseItemRepositoryGetter) {
        super(models_1.LooseItem, dataSource);
        this.designRepositoryGetter = designRepositoryGetter;
        this.designAdditionalLooseItemRepositoryGetter = designAdditionalLooseItemRepositoryGetter;
        this.designAdditionalLooseItems = this.createHasManyRepositoryFactoryFor('designAdditionalLooseItems', designAdditionalLooseItemRepositoryGetter);
        this.registerInclusionResolver('designAdditionalLooseItems', this.designAdditionalLooseItems.inclusionResolver);
        this.design = this.createBelongsToAccessorFor('design', designRepositoryGetter);
        this.registerInclusionResolver('design', this.design.inclusionResolver);
    }
};
LooseItemRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mysql')),
    tslib_1.__param(1, repository_1.repository.getter('DesignRepository')),
    tslib_1.__param(2, repository_1.repository.getter('DesignAdditionalLooseItemRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDataSource, Function, Function])
], LooseItemRepository);
exports.LooseItemRepository = LooseItemRepository;
//# sourceMappingURL=loose-item.repository.js.map