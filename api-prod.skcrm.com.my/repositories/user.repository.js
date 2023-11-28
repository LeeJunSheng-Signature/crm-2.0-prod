"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let UserRepository = class UserRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, credentialRepositoryGetter, userRoleRepositoryGetter, roleRepositoryGetter, sessionRepositoryGetter, profileRepositoryGetter, branchRepositoryGetter, userPermissionRepositoryGetter, permissionRepositoryGetter, userLoggingRepositoryGetter) {
        super(models_1.User, dataSource);
        this.credentialRepositoryGetter = credentialRepositoryGetter;
        this.userRoleRepositoryGetter = userRoleRepositoryGetter;
        this.roleRepositoryGetter = roleRepositoryGetter;
        this.sessionRepositoryGetter = sessionRepositoryGetter;
        this.profileRepositoryGetter = profileRepositoryGetter;
        this.branchRepositoryGetter = branchRepositoryGetter;
        this.userPermissionRepositoryGetter = userPermissionRepositoryGetter;
        this.permissionRepositoryGetter = permissionRepositoryGetter;
        this.userLoggingRepositoryGetter = userLoggingRepositoryGetter;
        this.userLoggings = this.createHasManyRepositoryFactoryFor('userLoggings', userLoggingRepositoryGetter);
        this.registerInclusionResolver('userLoggings', this.userLoggings.inclusionResolver);
        this.permissions = this.createHasManyThroughRepositoryFactoryFor('permissions', permissionRepositoryGetter, userPermissionRepositoryGetter);
        this.registerInclusionResolver('permissions', this.permissions.inclusionResolver);
        this.branch = this.createBelongsToAccessorFor('branch', branchRepositoryGetter);
        this.registerInclusionResolver('branch', this.branch.inclusionResolver);
        this.profile = this.createHasOneRepositoryFactoryFor('profile', profileRepositoryGetter);
        this.registerInclusionResolver('profile', this.profile.inclusionResolver);
        this.sessions = this.createHasManyRepositoryFactoryFor('sessions', sessionRepositoryGetter);
        this.registerInclusionResolver('sessions', this.sessions.inclusionResolver);
        this.roles = this.createHasManyThroughRepositoryFactoryFor('roles', roleRepositoryGetter, userRoleRepositoryGetter);
        this.registerInclusionResolver('roles', this.roles.inclusionResolver);
        this.credential = this.createHasOneRepositoryFactoryFor('credential', credentialRepositoryGetter);
    }
    async findCredentials(userId) {
        try {
            return await this.credential(userId).get();
        }
        catch (err) {
            if (err.code === 'ENTITY_NOT_FOUND') {
                return undefined;
            }
            throw err;
        }
    }
};
UserRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mysql')),
    tslib_1.__param(1, repository_1.repository.getter('CredentialRepository')),
    tslib_1.__param(2, repository_1.repository.getter('UserRoleRepository')),
    tslib_1.__param(3, repository_1.repository.getter('RoleRepository')),
    tslib_1.__param(4, repository_1.repository.getter('SessionRepository')),
    tslib_1.__param(5, repository_1.repository.getter('ProfileRepository')),
    tslib_1.__param(6, repository_1.repository.getter('BranchRepository')),
    tslib_1.__param(7, repository_1.repository.getter('UserPermissionRepository')),
    tslib_1.__param(8, repository_1.repository.getter('PermissionRepository')), tslib_1.__param(9, repository_1.repository.getter('UserLoggingRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDataSource, Function, Function, Function, Function, Function, Function, Function, Function, Function])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map