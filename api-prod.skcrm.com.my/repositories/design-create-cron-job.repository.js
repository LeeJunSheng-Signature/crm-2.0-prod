"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignCreateCronJobRepository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const core_1 = require("@loopback/core");
let DesignCreateCronJobRepository = class DesignCreateCronJobRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, designRepositoryGetter) {
        super(models_1.DesignCreateCronJob, dataSource);
        this.designRepositoryGetter = designRepositoryGetter;
        this.design = this.createBelongsToAccessorFor('design', designRepositoryGetter);
        this.registerInclusionResolver('design', this.design.inclusionResolver);
    }
};
DesignCreateCronJobRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mysql')),
    tslib_1.__param(1, repository_1.repository.getter('DesignRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDataSource, Function])
], DesignCreateCronJobRepository);
exports.DesignCreateCronJobRepository = DesignCreateCronJobRepository;
//# sourceMappingURL=design-create-cron-job.repository.js.map