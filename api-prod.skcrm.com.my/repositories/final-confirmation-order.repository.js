"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinalConfirmationOrderRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let FinalConfirmationOrderRepository = class FinalConfirmationOrderRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, designRepositoryGetter, leadRepositoryGetter, paymentAttachmentRepositoryGetter) {
        super(models_1.FinalConfirmationOrder, dataSource);
        this.designRepositoryGetter = designRepositoryGetter;
        this.leadRepositoryGetter = leadRepositoryGetter;
        this.paymentAttachmentRepositoryGetter = paymentAttachmentRepositoryGetter;
        this.paymentAttachments = this.createHasManyRepositoryFactoryFor('paymentAttachments', paymentAttachmentRepositoryGetter);
        this.registerInclusionResolver('paymentAttachments', this.paymentAttachments.inclusionResolver);
        this.lead = this.createBelongsToAccessorFor('lead', leadRepositoryGetter);
        this.registerInclusionResolver('lead', this.lead.inclusionResolver);
        this.designs = this.createHasManyRepositoryFactoryFor('designs', designRepositoryGetter);
        this.registerInclusionResolver('designs', this.designs.inclusionResolver);
    }
};
FinalConfirmationOrderRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mysql')), tslib_1.__param(1, repository_1.repository.getter('DesignRepository')), tslib_1.__param(2, repository_1.repository.getter('LeadRepository')), tslib_1.__param(3, repository_1.repository.getter('PaymentAttachmentRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDataSource, Function, Function, Function])
], FinalConfirmationOrderRepository);
exports.FinalConfirmationOrderRepository = FinalConfirmationOrderRepository;
//# sourceMappingURL=final-confirmation-order.repository.js.map