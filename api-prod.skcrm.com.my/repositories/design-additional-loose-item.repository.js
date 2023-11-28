"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignAdditionalLooseItemRepository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const core_1 = require("@loopback/core");
let DesignAdditionalLooseItemRepository = class DesignAdditionalLooseItemRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, designRepositoryGetter, looseItemRepositoryGetter) {
        super(models_1.DesignAdditionalLooseItem, dataSource);
        this.designRepositoryGetter = designRepositoryGetter;
        this.looseItemRepositoryGetter = looseItemRepositoryGetter;
        this.looseItem = this.createBelongsToAccessorFor('looseItem', looseItemRepositoryGetter);
        this.registerInclusionResolver('looseItem', this.looseItem.inclusionResolver);
        this.design = this.createBelongsToAccessorFor('design', designRepositoryGetter);
        this.registerInclusionResolver('design', this.design.inclusionResolver);
    }
};
DesignAdditionalLooseItemRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mysql')), tslib_1.__param(1, repository_1.repository.getter('DesignRepository')), tslib_1.__param(2, repository_1.repository.getter('LooseItemRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDataSource, Function, Function])
], DesignAdditionalLooseItemRepository);
exports.DesignAdditionalLooseItemRepository = DesignAdditionalLooseItemRepository;
//# sourceMappingURL=design-additional-loose-item.repository.js.map