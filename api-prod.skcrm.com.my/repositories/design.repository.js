"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let DesignRepository = class DesignRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, quotationDetailsRepositoryGetter, tradingItemRepositoryGetter, looseItemRepositoryGetter, designOtherItemRepositoryGetter, designAdditionalItemRepositoryGetter, designAdditionalLooseItemRepositoryGetter, leadRepositoryGetter, orderInfoRepositoryGetter, brandGoodsRepositoryGetter, finalConfirmationOrderRepositoryGetter, designCreateCronJobRepositoryGetter) {
        super(models_1.Design, dataSource);
        this.quotationDetailsRepositoryGetter = quotationDetailsRepositoryGetter;
        this.tradingItemRepositoryGetter = tradingItemRepositoryGetter;
        this.looseItemRepositoryGetter = looseItemRepositoryGetter;
        this.designOtherItemRepositoryGetter = designOtherItemRepositoryGetter;
        this.designAdditionalItemRepositoryGetter = designAdditionalItemRepositoryGetter;
        this.designAdditionalLooseItemRepositoryGetter = designAdditionalLooseItemRepositoryGetter;
        this.leadRepositoryGetter = leadRepositoryGetter;
        this.orderInfoRepositoryGetter = orderInfoRepositoryGetter;
        this.brandGoodsRepositoryGetter = brandGoodsRepositoryGetter;
        this.finalConfirmationOrderRepositoryGetter = finalConfirmationOrderRepositoryGetter;
        this.designCreateCronJobRepositoryGetter = designCreateCronJobRepositoryGetter;
        this.designCreateCronJob = this.createHasOneRepositoryFactoryFor('designCreateCronJob', designCreateCronJobRepositoryGetter);
        this.registerInclusionResolver('designCreateCronJob', this.designCreateCronJob.inclusionResolver);
        this.looseItems = this.createHasManyThroughRepositoryFactoryFor('looseItems', looseItemRepositoryGetter, designAdditionalLooseItemRepositoryGetter);
        this.registerInclusionResolver('looseItems', this.looseItems.inclusionResolver);
        this.designAdditionalLooseItems = this.createHasManyRepositoryFactoryFor('designAdditionalLooseItems', designAdditionalLooseItemRepositoryGetter);
        this.registerInclusionResolver('designAdditionalLooseItems', this.designAdditionalLooseItems.inclusionResolver);
        this.designOtherItems = this.createHasManyRepositoryFactoryFor('designOtherItems', designOtherItemRepositoryGetter);
        this.registerInclusionResolver('designOtherItems', this.designOtherItems.inclusionResolver);
        this.designAdditionalItems = this.createHasManyRepositoryFactoryFor('designAdditionalItems', designAdditionalItemRepositoryGetter);
        this.registerInclusionResolver('designAdditionalItems', this.designAdditionalItems.inclusionResolver);
        this.finalConfirmationOrder = this.createBelongsToAccessorFor('finalConfirmationOrder', finalConfirmationOrderRepositoryGetter);
        this.registerInclusionResolver('finalConfirmationOrder', this.finalConfirmationOrder.inclusionResolver);
        this.tradingItems = this.createHasManyThroughRepositoryFactoryFor('tradingItems', tradingItemRepositoryGetter, designAdditionalItemRepositoryGetter);
        this.registerInclusionResolver('tradingItems', this.tradingItems.inclusionResolver);
        this.brandGoods = this.createHasManyRepositoryFactoryFor('brandGoods', brandGoodsRepositoryGetter);
        this.registerInclusionResolver('brandGoods', this.brandGoods.inclusionResolver);
        this.orderInfo = this.createHasOneRepositoryFactoryFor('orderInfo', orderInfoRepositoryGetter);
        this.registerInclusionResolver('orderInfo', this.orderInfo.inclusionResolver);
        this.lead = this.createBelongsToAccessorFor('lead', leadRepositoryGetter);
        this.registerInclusionResolver('lead', this.lead.inclusionResolver);
        this.finalConfirmationOrder = this.createBelongsToAccessorFor('finalConfirmationOrder', finalConfirmationOrderRepositoryGetter);
        this.registerInclusionResolver('finalConfirmationOrder', this.finalConfirmationOrder.inclusionResolver);
        this.orderInfo = this.createHasOneRepositoryFactoryFor('orderInfo', orderInfoRepositoryGetter);
        this.registerInclusionResolver('orderInfo', this.orderInfo.inclusionResolver);
        this.brandGoods = this.createHasManyRepositoryFactoryFor('brandGoods', brandGoodsRepositoryGetter);
        this.registerInclusionResolver('brandGoods', this.brandGoods.inclusionResolver);
        this.quotationDetails = this.createHasManyRepositoryFactoryFor('quotationDetails', quotationDetailsRepositoryGetter);
        this.registerInclusionResolver('quotationDetails', this.quotationDetails.inclusionResolver);
        this.tradingItems = this.createHasManyThroughRepositoryFactoryFor('tradingItems', tradingItemRepositoryGetter, designAdditionalItemRepositoryGetter);
        this.registerInclusionResolver('tradingItems', this.tradingItems.inclusionResolver);
        this.looseItems = this.createHasManyThroughRepositoryFactoryFor('looseItems', looseItemRepositoryGetter, designAdditionalLooseItemRepositoryGetter);
        this.registerInclusionResolver('looseItems', this.looseItems.inclusionResolver);
        this.designOtherItems = this.createHasManyRepositoryFactoryFor('designOtherItems', designOtherItemRepositoryGetter);
        this.registerInclusionResolver('designOtherItems', this.designOtherItems.inclusionResolver);
        this.designAdditionalItems = this.createHasManyRepositoryFactoryFor('designAdditionalItems', designAdditionalItemRepositoryGetter);
        this.registerInclusionResolver('designAdditionalItems', this.designAdditionalItems.inclusionResolver);
        this.designAdditionalLooseItems = this.createHasManyRepositoryFactoryFor('designAdditionalLooseItems', designAdditionalLooseItemRepositoryGetter);
        this.registerInclusionResolver('designAdditionalLooseItems', this.designAdditionalLooseItems.inclusionResolver);
    }
};
DesignRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mysql')),
    tslib_1.__param(1, repository_1.repository.getter('QuotationDetailsRepository')),
    tslib_1.__param(2, repository_1.repository.getter('TradingItemRepository')),
    tslib_1.__param(3, repository_1.repository.getter('LooseItemRepository')),
    tslib_1.__param(4, repository_1.repository.getter('DesignOtherItemRepository')),
    tslib_1.__param(5, repository_1.repository.getter('DesignAdditionalItemRepository')),
    tslib_1.__param(6, repository_1.repository.getter('DesignAdditionalLooseItemRepository')),
    tslib_1.__param(7, repository_1.repository.getter('LeadRepository')),
    tslib_1.__param(8, repository_1.repository.getter('OrderInfoRepository')),
    tslib_1.__param(9, repository_1.repository.getter('BrandGoodsRepository')),
    tslib_1.__param(10, repository_1.repository.getter('FinalConfirmationOrderRepository')),
    tslib_1.__param(11, repository_1.repository.getter('DesignCreateCronJobRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDataSource, Function, Function, Function, Function, Function, Function, Function, Function, Function, Function, Function])
], DesignRepository);
exports.DesignRepository = DesignRepository;
//# sourceMappingURL=design.repository.js.map