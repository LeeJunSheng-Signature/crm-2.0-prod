"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceReportRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let ServiceReportRepository = class ServiceReportRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, leadRepositoryGetter, paymentAttachmentRepositoryGetter, userRepositoryGetter, serviceOrderItemCustomRepositoryGetter, serviceOrderItemRepositoryGetter) {
        super(models_1.ServiceReport, dataSource);
        this.leadRepositoryGetter = leadRepositoryGetter;
        this.paymentAttachmentRepositoryGetter = paymentAttachmentRepositoryGetter;
        this.userRepositoryGetter = userRepositoryGetter;
        this.serviceOrderItemCustomRepositoryGetter = serviceOrderItemCustomRepositoryGetter;
        this.serviceOrderItemRepositoryGetter = serviceOrderItemRepositoryGetter;
        this.items = this.createHasManyRepositoryFactoryFor('items', serviceOrderItemRepositoryGetter);
        this.registerInclusionResolver('items', this.items.inclusionResolver);
        this.customItems = this.createHasManyRepositoryFactoryFor('customItems', serviceOrderItemCustomRepositoryGetter);
        this.registerInclusionResolver('customItems', this.customItems.inclusionResolver);
        this.submitter = this.createBelongsToAccessorFor('submitter', userRepositoryGetter);
        this.registerInclusionResolver('submitter', this.submitter.inclusionResolver);
        this.attachments = this.createHasManyRepositoryFactoryFor('attachments', paymentAttachmentRepositoryGetter);
        this.registerInclusionResolver('attachments', this.attachments.inclusionResolver);
        this.lead = this.createBelongsToAccessorFor('lead', leadRepositoryGetter);
        this.registerInclusionResolver('lead', this.lead.inclusionResolver);
    }
};
ServiceReportRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mysql')), tslib_1.__param(1, repository_1.repository.getter('LeadRepository')), tslib_1.__param(2, repository_1.repository.getter('PaymentAttachmentRepository')), tslib_1.__param(3, repository_1.repository.getter('UserRepository')), tslib_1.__param(4, repository_1.repository.getter('ServiceOrderItemCustomRepository')), tslib_1.__param(5, repository_1.repository.getter('ServiceOrderItemRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDataSource, Function, Function, Function, Function, Function])
], ServiceReportRepository);
exports.ServiceReportRepository = ServiceReportRepository;
//# sourceMappingURL=service-report.repository.js.map