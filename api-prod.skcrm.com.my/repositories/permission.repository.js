"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let PermissionRepository = class PermissionRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, rolepermissionRepositoryGetter, roleRepositoryGetter, modulePermissionRepositoryGetter, moduleRepositoryGetter, operationPermissionRepositoryGetter, operationRepositoryGetter, userPermissionRepositoryGetter, userRepositoryGetter) {
        super(models_1.Permission, dataSource);
        this.rolepermissionRepositoryGetter = rolepermissionRepositoryGetter;
        this.roleRepositoryGetter = roleRepositoryGetter;
        this.modulePermissionRepositoryGetter = modulePermissionRepositoryGetter;
        this.moduleRepositoryGetter = moduleRepositoryGetter;
        this.operationPermissionRepositoryGetter = operationPermissionRepositoryGetter;
        this.operationRepositoryGetter = operationRepositoryGetter;
        this.userPermissionRepositoryGetter = userPermissionRepositoryGetter;
        this.userRepositoryGetter = userRepositoryGetter;
        this.users = this.createHasManyThroughRepositoryFactoryFor('users', userRepositoryGetter, userPermissionRepositoryGetter);
        this.registerInclusionResolver('users', this.users.inclusionResolver);
        this.operations = this.createHasManyThroughRepositoryFactoryFor('operations', operationRepositoryGetter, operationPermissionRepositoryGetter);
        this.modules = this.createHasManyThroughRepositoryFactoryFor('modules', moduleRepositoryGetter, modulePermissionRepositoryGetter);
        this.roles = this.createHasManyThroughRepositoryFactoryFor('roles', roleRepositoryGetter, rolepermissionRepositoryGetter);
    }
};
PermissionRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mysql')), tslib_1.__param(1, repository_1.repository.getter('RolepermissionRepository')), tslib_1.__param(2, repository_1.repository.getter('RoleRepository')), tslib_1.__param(3, repository_1.repository.getter('ModulePermissionRepository')), tslib_1.__param(4, repository_1.repository.getter('ModuleRepository')), tslib_1.__param(5, repository_1.repository.getter('OperationPermissionRepository')), tslib_1.__param(6, repository_1.repository.getter('OperationRepository')), tslib_1.__param(7, repository_1.repository.getter('UserPermissionRepository')), tslib_1.__param(8, repository_1.repository.getter('UserRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDataSource, Function, Function, Function, Function, Function, Function, Function, Function])
], PermissionRepository);
exports.PermissionRepository = PermissionRepository;
//# sourceMappingURL=permission.repository.js.map