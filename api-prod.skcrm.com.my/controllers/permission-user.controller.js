"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionUserController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let PermissionUserController = class PermissionUserController {
    constructor(permissionRepository) {
        this.permissionRepository = permissionRepository;
    }
    async find(id, filter) {
        return this.permissionRepository.users(id).find(filter);
    }
    async create(id, user) {
        return this.permissionRepository.users(id).create(user);
    }
    async patch(id, user, where) {
        return this.permissionRepository.users(id).patch(user, where);
    }
    async delete(id, where) {
        return this.permissionRepository.users(id).delete(where);
    }
};
tslib_1.__decorate([
    rest_1.get('/permissions/{id}/users', {
        responses: {
            '200': {
                description: 'Array of Permission has many User through UserPermission',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.User) },
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
], PermissionUserController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.post('/permissions/{id}/users', {
        responses: {
            '200': {
                description: 'create a User model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.User) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.User, {
                    title: 'NewUserInPermission',
                    exclude: ['uuid'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PermissionUserController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.patch('/permissions/{id}/users', {
        responses: {
            '200': {
                description: 'Permission.User PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.User, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.User))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PermissionUserController.prototype, "patch", null);
tslib_1.__decorate([
    rest_1.del('/permissions/{id}/users', {
        responses: {
            '200': {
                description: 'Permission.User DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.User))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PermissionUserController.prototype, "delete", null);
PermissionUserController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.PermissionRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.PermissionRepository])
], PermissionUserController);
exports.PermissionUserController = PermissionUserController;
//# sourceMappingURL=permission-user.controller.js.map