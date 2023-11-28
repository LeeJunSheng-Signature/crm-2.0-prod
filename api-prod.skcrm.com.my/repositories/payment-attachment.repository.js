"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentAttachmentRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let PaymentAttachmentRepository = class PaymentAttachmentRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, paymentOptionsRepositoryGetter) {
        super(models_1.PaymentAttachment, dataSource);
        this.paymentOptionsRepositoryGetter = paymentOptionsRepositoryGetter;
        this.paymentOptions = this.createHasOneRepositoryFactoryFor('paymentOptions', paymentOptionsRepositoryGetter);
        this.registerInclusionResolver('paymentOptions', this.paymentOptions.inclusionResolver);
    }
};
PaymentAttachmentRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mysql')), tslib_1.__param(1, repository_1.repository.getter('PaymentOptionsRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDataSource, Function])
], PaymentAttachmentRepository);
exports.PaymentAttachmentRepository = PaymentAttachmentRepository;
//# sourceMappingURL=payment-attachment.repository.js.map