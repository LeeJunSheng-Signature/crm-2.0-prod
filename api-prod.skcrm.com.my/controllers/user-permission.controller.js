"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPermissionController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const schema_1 = require("../schema");
let UserPermissionController = class UserPermissionController {
    constructor(userRepository, permissionRepository, roleRepository) {
        this.userRepository = userRepository;
        this.permissionRepository = permissionRepository;
        this.roleRepository = roleRepository;
    }
    async find(id, filter) {
        return this.userRepository.permissions(id).find(filter);
    }
    async attach(id, permission) {
        const userPermissions = await this.userRepository.permissions(id).find();
        const userRoles = await this.userRepository.roles(id).find();
        for (const userPermission of userPermissions) {
            await this.permissionRepository.users(userPermission.uuid).unlink(id);
        }
        for (const userPermission of userPermissions) {
            await this.permissionRepository.users(userPermission.uuid).unlink(id);
        }
        for (const userRole of userRoles) {
            await this.roleRepository.users(userRole.uuid).unlink(id);
        }
        for (const permissionId of permission.permissionIds) {
            await this.userRepository.permissions(id).link(permissionId);
        }
        for (const roleId of permission.rolesIds) {
            await this.userRepository.roles(id).link(roleId);
        }
        // return this.userRepository.findById(id)
    }
    async create(id, permission) {
        return this.userRepository.permissions(id).create(permission);
    }
    async patch(id, permission, where) {
        return this.userRepository.permissions(id).patch(permission, where);
    }
    async delete(id, where) {
        return this.userRepository.permissions(id).delete(where);
    }
};
tslib_1.__decorate([
    rest_1.get('/users/{id}/permissions', {
        responses: {
            '200': {
                description: 'Array of User has many Permission through UserPermission',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.Permission) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('filter')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserPermissionController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.post('/users/{id}/roles/permission/reattach', {
        responses: {
            '200': {
                description: 'Permission reattach',
                content: {
                    'application/json': {
                        schema: schema_1.UserPermissionAttachSchema
                    }
                }
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: schema_1.UserPermissionAttachSchema,
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserPermissionController.prototype, "attach", null);
tslib_1.__decorate([
    rest_1.post('/users/{id}/permissions', {
        responses: {
            '200': {
                description: 'create a Permission model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Permission) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Permission, {
                    title: 'NewPermissionInUser',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserPermissionController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.patch('/users/{id}/permissions', {
        responses: {
            '200': {
                description: 'User.Permission PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Permission, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Permission))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserPermissionController.prototype, "patch", null);
tslib_1.__decorate([
    rest_1.del('/users/{id}/permissions', {
        responses: {
            '200': {
                description: 'User.Permission DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Permission))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserPermissionController.prototype, "delete", null);
UserPermissionController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.PermissionRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.RoleRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository,
        repositories_1.PermissionRepository,
        repositories_1.RoleRepository])
], UserPermissionController);
exports.UserPermissionController = UserPermissionController;
//# sourceMappingURL=user-permission.controller.js.map