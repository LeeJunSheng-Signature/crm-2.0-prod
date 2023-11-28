"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionSeederObserver = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../repositories");
const models_1 = require("./../models");
const permissions = tslib_1.__importStar(require("./../server/permission.json"));
/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
let PermissionSeederObserver = class PermissionSeederObserver {
    constructor(permissionRepository) {
        this.permissionRepository = permissionRepository;
    }
    /**
     * This method will be invoked when the application starts
     */
    async start() {
        const count = (await this.permissionRepository.count()).count;
        if (count !== 0)
            return;
        permissions.data.forEach(permission => {
            this.permissionRepository.create(new models_1.Permission(permission));
        });
    }
    /**
     * This method will be invoked when the application stops
     */
    async stop() {
        // Add your logic for stop
    }
};
PermissionSeederObserver = tslib_1.__decorate([
    core_1.lifeCycleObserver('Seeder'),
    tslib_1.__param(0, repository_1.repository(repositories_1.PermissionRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.PermissionRepository])
], PermissionSeederObserver);
exports.PermissionSeederObserver = PermissionSeederObserver;
//# sourceMappingURL=permission-seeder.observer.js.map