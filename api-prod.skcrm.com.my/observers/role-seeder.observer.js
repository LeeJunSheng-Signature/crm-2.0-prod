"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleSeederObserver = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../repositories");
const models_1 = require("./../models");
const roles = tslib_1.__importStar(require("./../server/roles.json"));
/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
let RoleSeederObserver = class RoleSeederObserver {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    /**
     * This method will be invoked when the application starts
     */
    async start() {
        const count = (await this.roleRepository.count()).count;
        if (count !== 0)
            return;
        roles.data.forEach(role => {
            this.roleRepository.create(new models_1.Role(role));
        });
    }
    /**
     * This method will be invoked when the application stops
     */
    async stop() {
        // Add your logic for stop
    }
};
RoleSeederObserver = tslib_1.__decorate([
    core_1.lifeCycleObserver('Seeder'),
    tslib_1.__param(0, repository_1.repository(repositories_1.RoleRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.RoleRepository])
], RoleSeederObserver);
exports.RoleSeederObserver = RoleSeederObserver;
//# sourceMappingURL=role-seeder.observer.js.map