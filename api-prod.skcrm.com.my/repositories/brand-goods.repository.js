"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandGoodsRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let BrandGoodsRepository = class BrandGoodsRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, designRepositoryGetter) {
        super(models_1.BrandGoods, dataSource);
        this.designRepositoryGetter = designRepositoryGetter;
        this.design = this.createBelongsToAccessorFor('design', designRepositoryGetter);
    }
};
BrandGoodsRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mysql')), tslib_1.__param(1, repository_1.repository.getter('DesignRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDataSource, Function])
], BrandGoodsRepository);
exports.BrandGoodsRepository = BrandGoodsRepository;
//# sourceMappingURL=brand-goods.repository.js.map