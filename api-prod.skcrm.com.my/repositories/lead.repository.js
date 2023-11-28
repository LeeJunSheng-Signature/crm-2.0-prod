"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let LeadRepository = class LeadRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, userRepositoryGetter, branchRepositoryGetter, exhibitionRepositoryGetter, designRepositoryGetter, finalConfirmationOrderRepositoryGetter) {
        super(models_1.Lead, dataSource);
        this.userRepositoryGetter = userRepositoryGetter;
        this.branchRepositoryGetter = branchRepositoryGetter;
        this.exhibitionRepositoryGetter = exhibitionRepositoryGetter;
        this.designRepositoryGetter = designRepositoryGetter;
        this.finalConfirmationOrderRepositoryGetter = finalConfirmationOrderRepositoryGetter;
        this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
        this.registerInclusionResolver('user', this.user.inclusionResolver);
        this.branch = this.createBelongsToAccessorFor('branch', branchRepositoryGetter);
        this.registerInclusionResolver('branch', this.branch.inclusionResolver);
        this.exhibition = this.createBelongsToAccessorFor('exhibitions', exhibitionRepositoryGetter);
        this.registerInclusionResolver('exhibitions', this.exhibition.inclusionResolver);
        this.designs = this.createHasManyRepositoryFactoryFor('designs', designRepositoryGetter);
        this.registerInclusionResolver('designs', this.designs.inclusionResolver);
        this.finalConfirmationOrders = this.createHasManyRepositoryFactoryFor('finalConfirmationOrders', finalConfirmationOrderRepositoryGetter);
        this.registerInclusionResolver('finalConfirmationOrders', this.finalConfirmationOrders.inclusionResolver);
    }
};
LeadRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mysql')),
    tslib_1.__param(1, repository_1.repository.getter('UserRepository')),
    tslib_1.__param(2, repository_1.repository.getter('BranchRepository')),
    tslib_1.__param(3, repository_1.repository.getter('ExhibitionRepository')),
    tslib_1.__param(4, repository_1.repository.getter('DesignRepository')),
    tslib_1.__param(5, repository_1.repository.getter('FinalConfirmationOrderRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDataSource, Function, Function, Function, Function, Function])
], LeadRepository);
exports.LeadRepository = LeadRepository;
//# sourceMappingURL=lead.repository.js.map