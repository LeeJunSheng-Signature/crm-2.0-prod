"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let BranchRepository = class BranchRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, LeadRepositoryGetter, branchRepositoryGetter, userRepositoryGetter) {
        super(models_1.Branch, dataSource);
        this.LeadRepositoryGetter = LeadRepositoryGetter;
        this.branchRepositoryGetter = branchRepositoryGetter;
        this.userRepositoryGetter = userRepositoryGetter;
        this.users = this.createHasManyRepositoryFactoryFor('users', userRepositoryGetter);
        this.registerInclusionResolver('users', this.users.inclusionResolver);
        this.leads = this.createHasManyRepositoryFactoryFor('leads', LeadRepositoryGetter);
        this.registerInclusionResolver('leads', this.leads.inclusionResolver);
        this.subBranches = this.createHasManyRepositoryFactoryFor('subBranches', core_1.Getter.fromValue(this));
        this.registerInclusionResolver('subBranches', this.subBranches.inclusionResolver);
    }
};
BranchRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mysql')), tslib_1.__param(1, repository_1.repository.getter('LeadRepository')), tslib_1.__param(2, repository_1.repository.getter('BranchRepository')), tslib_1.__param(3, repository_1.repository.getter('UserRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDataSource, Function, Function, Function])
], BranchRepository);
exports.BranchRepository = BranchRepository;
//# sourceMappingURL=branch.repository.js.map