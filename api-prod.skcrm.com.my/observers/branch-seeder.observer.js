"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchObserver = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const branches = tslib_1.__importStar(require("./../server/branch.json"));
/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
let BranchObserver = class BranchObserver {
    constructor(branchRepository) {
        this.branchRepository = branchRepository;
    }
    /**
     * This method will be invoked when the application starts
     */
    async start() {
        const count = (await this.branchRepository.count()).count;
        if (count !== 0)
            return;
        branches.data.forEach(branch => {
            this.branchRepository.create(new models_1.Branch(branch));
        });
    }
    /**
     * This method will be invoked when the application stops
     */
    async stop() {
        // Add your logic for stop
    }
};
BranchObserver = tslib_1.__decorate([
    core_1.lifeCycleObserver('Seeder'),
    tslib_1.__param(0, repository_1.repository(repositories_1.BranchRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BranchRepository])
], BranchObserver);
exports.BranchObserver = BranchObserver;
//# sourceMappingURL=branch-seeder.observer.js.map