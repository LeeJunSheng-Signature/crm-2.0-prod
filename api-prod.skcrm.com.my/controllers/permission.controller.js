"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const schema_1 = require("../schema");
let PermissionController = class PermissionController {
    constructor(permissionRepository, roleRepository) {
        this.permissionRepository = permissionRepository;
        this.roleRepository = roleRepository;
    }
    async create(permission) {
        return this.permissionRepository.create(permission);
    }
    async count(where) {
        return this.permissionRepository.count(where);
    }
    async find(filter) {
        return this.permissionRepository.find(filter);
    }
    async updateAll(permission, where) {
        return this.permissionRepository.updateAll(permission, where);
    }
    async findById(id, filter) {
        return this.permissionRepository.findById(id, filter);
    }
    async updateById(id, permission) {
        await this.permissionRepository.updateById(id, permission);
    }
    async replaceById(id, permission) {
        await this.permissionRepository.replaceById(id, permission);
    }
    async deleteById(id) {
        await this.permissionRepository.deleteById(id);
    }
    async assignPermissionToRole(id, roleObj) {
        await this.permissionRepository.roles(id).link(roleObj.role);
        return this.permissionRepository.findById(id);
    }
    async unassignPermissionToRole(id, roleObj) {
        await this.permissionRepository.roles(id).unlink(roleObj.role);
        return this.permissionRepository.findById(id);
    }
    async assignModuleToPermission(id, module) {
        await this.permissionRepository.modules(id).link(module.moduleId);
        return this.permissionRepository.findById(id);
    }
    async unassignModuleToPermission(id, module) {
        await this.permissionRepository.modules(id).unlink(module.moduleId);
        return this.permissionRepository.findById(id);
    }
    async assignOperationToPermission(id, operation) {
        await this.permissionRepository.operations(id).link(operation.operationId);
        return this.permissionRepository.findById(id);
    }
    async unassignOperationToPermission(id, operation) {
        await this.permissionRepository
            .operations(id)
            .unlink(operation.operationId);
        return this.permissionRepository.findById(id);
    }
    async assignPermissionToUser(id, userObj) {
        await this.permissionRepository.users(id).link(userObj.userUuid);
        return this.permissionRepository.findById(id);
    }
    async unassignPermissionToUser(id, userObj) {
        await this.permissionRepository.users(id).unlink(userObj.userUuid);
        return this.permissionRepository.findById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/permission', {
        responses: {
            '200': {
                description: 'Permission model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Permission) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Permission, {
                    title: 'NewPermission',
                    exclude: ['uuid', 'createdAt', 'updatedAt', 'deletedAt'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PermissionController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/permission/count', {
        responses: {
            '200': {
                description: 'Permission model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Permission)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PermissionController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/permission', {
        responses: {
            '200': {
                description: 'Array of Permission model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Permission, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Permission)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PermissionController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/permission', {
        responses: {
            '200': {
                description: 'Permission PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Permission, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Permission)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Permission, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PermissionController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/permission/{id}', {
        responses: {
            '200': {
                description: 'Permission model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Permission, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Permission, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PermissionController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/permission/{id}', {
        responses: {
            '204': {
                description: 'Permission PATCH success',
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
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Permission]),
    tslib_1.__metadata("design:returntype", Promise)
], PermissionController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/permission/{id}', {
        responses: {
            '204': {
                description: 'Permission PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Permission]),
    tslib_1.__metadata("design:returntype", Promise)
], PermissionController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/permission/{id}', {
        responses: {
            '204': {
                description: 'Permission DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], PermissionController.prototype, "deleteById", null);
tslib_1.__decorate([
    rest_1.post('/permissions/{id}/role/assign', {
        responses: {
            '200': {
                description: 'Assign permission to role',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Permission, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: schema_1.RolePermissionSchema,
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PermissionController.prototype, "assignPermissionToRole", null);
tslib_1.__decorate([
    rest_1.post('/permissions/{id}/role/unassign', {
        responses: {
            '200': {
                description: 'unassign permission from role',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Permission, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: schema_1.RolePermissionSchema,
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PermissionController.prototype, "unassignPermissionToRole", null);
tslib_1.__decorate([
    rest_1.post('/permissions/{id}/module/assign', {
        responses: {
            '200': {
                description: 'Assign modules to permission',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Permission, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: schema_1.ModulePermissionSchema,
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PermissionController.prototype, "assignModuleToPermission", null);
tslib_1.__decorate([
    rest_1.post('/permissions/{id}/module/unassign', {
        responses: {
            '200': {
                description: 'Unassign modules to permission',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Permission, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: schema_1.ModulePermissionSchema,
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PermissionController.prototype, "unassignModuleToPermission", null);
tslib_1.__decorate([
    rest_1.post('/permissions/{id}/operation/assign', {
        responses: {
            '200': {
                description: 'Assign operations to permission',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Permission, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: schema_1.OperationPermissionSchema,
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PermissionController.prototype, "assignOperationToPermission", null);
tslib_1.__decorate([
    rest_1.post('/permissions/{id}/operation/unassign', {
        responses: {
            '200': {
                description: 'Unassign modules to permission',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Permission, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: schema_1.OperationPermissionSchema,
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PermissionController.prototype, "unassignOperationToPermission", null);
tslib_1.__decorate([
    rest_1.post('/permissions/{id}/user/assign', {
        responses: {
            '200': {
                description: 'Assign permission to user',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Permission, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: schema_1.UserPermissionSchema,
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PermissionController.prototype, "assignPermissionToUser", null);
tslib_1.__decorate([
    rest_1.post('/permissions/{id}/user/unassign', {
        responses: {
            '200': {
                description: 'unassign permission from user',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Permission, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: schema_1.UserPermissionSchema,
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PermissionController.prototype, "unassignPermissionToUser", null);
PermissionController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.PermissionRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.RoleRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.PermissionRepository,
        repositories_1.RoleRepository])
], PermissionController);
exports.PermissionController = PermissionController;
//# sourceMappingURL=permission.controller.js.map