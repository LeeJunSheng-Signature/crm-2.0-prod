"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let RoleRepository = class RoleRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, rolepermissionRepositoryGetter, permissionRepositoryGetter, userRepositoryGetter, userroleRepositoryGetter) {
        super(models_1.Role, dataSource);
        this.rolepermissionRepositoryGetter = rolepermissionRepositoryGetter;
        this.permissionRepositoryGetter = permissionRepositoryGetter;
        this.userRepositoryGetter = userRepositoryGetter;
        this.userroleRepositoryGetter = userroleRepositoryGetter;
        this.permissions = this.createHasManyThroughRepositoryFactoryFor('permissions', permissionRepositoryGetter, rolepermissionRepositoryGetter);
        this.users = this.createHasManyThroughRepositoryFactoryFor('users', userRepositoryGetter, userroleRepositoryGetter);
    }
};
RoleRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mysql')), tslib_1.__param(1, repository_1.repository.getter('RolepermissionRepository')), tslib_1.__param(2, repository_1.repository.getter('PermissionRepository')),
    tslib_1.__param(3, repository_1.repository.getter('UserRepository')), tslib_1.__param(4, repository_1.repository.getter('UserRoleRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDataSource, Function, Function, Function, Function])
], RoleRepository);
exports.RoleRepository = RoleRepository;
//# sourceMappingURL=role.repository.js.map